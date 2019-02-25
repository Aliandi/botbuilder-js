// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as restify from 'restify';
import { BotFrameworkAdapter, MemoryStorage, UserState, ConversationState } from 'botbuilder';
import { MainDialog, FallbackRule, SendActivity, IfProperty, WelcomeRule, TextInput, RegExpRecognizer, ReplacePlanRule, SequenceDialog, CallDialog, DoStepsRule, CancelDialog, EventRule, SendList, SetProperty, SaveEntity, ChoiceInput, PlanChangeType, WaitForInput } from 'botbuilder-planning';
import { DialogContextState } from 'botbuilder-dialogs';

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open echobot.bot file in the Emulator.`);
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
const adapter = new BotFrameworkAdapter({
    appId: process.env.microsoftAppID,
    appPassword: process.env.microsoftAppPassword,
});

// Initialize state storage
const storage = new MemoryStorage();
const userState = new UserState(storage);
const convoState = new ConversationState(storage);

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await bot.run(context);

        // Save state changes
        await userState.saveChanges(context);
        await convoState.saveChanges(context);
    });
});

// Create the bots main dialog and bind it to storage.
const bot = new MainDialog([
    new SendActivity(`I'm sorry I didn't understand.`)
]);
bot.userState = userState.createProperty('user');
bot.botState = convoState.createProperty('bot');


//=============================================================================
// Planning Rules
//=============================================================================
// The rules add logic to process the users intent

// Bind planning dialog to its recognizer
const recognizer = new RegExpRecognizer()
    .addIntent('AddToDo', /(?:add|create) .*(?:to-do|todo|task) .*(?:called|named) (?<title>.*)/i)
    .addIntent('AddToDo', /(?:add|create) .*(?:to-do|todo|task)/i)
    .addIntent('DeleteToDo', /(?:delete|remove|clear) .*(?:to-do|todo|task) .*(?:called|named) (?<title>.*)/i)
    .addIntent('DeleteToDo', /(?:delete|remove|clear) .*(?:to-do|todo|task)/i)
    .addIntent('ClearToDos', /(?:delete|remove|clear) (?:all|every) (?:to-dos|todos|tasks)/i)
    .addIntent('ShowToDos', /(?:show|see|view) .*(?:to-do|todo|task)/i);
bot.recognizer = recognizer;

// Define welcome rule
bot.addRule(new WelcomeRule([
    new SendActivity(`Hi! I'm a ToDo bot. Say "add a todo named first one" to get started.`)
]));

// Define rules to handle various intents
// - These all just start a dialog
bot.addRule(new ReplacePlanRule('AddToDo', [
    new CallDialog('AddToDoDialog')
]));

bot.addRule(new ReplacePlanRule('DeleteToDo', [
    new CallDialog('DeleteToDoDialog')
]));

bot.addRule(new ReplacePlanRule('ClearToDos', [
    new CallDialog('ClearToDosDialog')
]))

bot.addRule(new DoStepsRule('ShowToDos', [
    new CallDialog('ShowToDosDialog')
]));

// Define rules to handle cancel events
bot.addRule(new EventRule('cancelAdd', [
    new SendActivity(`Ok... Cancelled adding new alarm.`)
]));

bot.addRule(new EventRule('cancelDelete', [
    new SendActivity(`Ok...`)
]));

//=============================================================================
// Sequences
//=============================================================================
// These are the sequence dialogs that the planning rules call.

const cancelRecognizer = new RegExpRecognizer().addIntent('CancelIntent', /^cancel/i);

// AddToDoDialog
const addToDoDialog = new SequenceDialog('AddToDoDialog', [
    new SaveEntity('title', 'dialog.result.title'),
    //new TextInput('dialog.result.title', `What would you like to call your new todo?`),
    new SendActivity(`What would you like to call your new todo?`),
    new WaitForInput('dialog.result.title'),
    new SetProperty(async (state) => {
        // Save todo to user state
        const title: string = state.getValue('dialog.result.title');
        const todos: string[] = state.getValue('user.todos') || [];
        todos.push(title);
        state.setValue('user.todos', todos);
    }),
    new SendActivity(`Added a todo named "{dialog.result.title}". You can delete it by saying "delete todo named {dialog.result.title}".`),
    new SendActivity(`To view your todos just ask me to "show my todos".`)
]);
addToDoDialog.recognizer = cancelRecognizer;
addToDoDialog.addRule(new DoStepsRule('CancelIntent', [
    new CancelDialog('cancelAdd')
]))
bot.addDialog(addToDoDialog);

// DeleteToDoDialog
const deleteToDoDialog = new SequenceDialog('DeleteToDoDialog', [
    new IfProperty(hasToDos, [
        new SaveEntity('title', 'dialog.result.title'),
        new ChoiceInput('dialog.result.title', `Which todo would you like to remove?`, 'user.todos'),
        new SetProperty(async (state) => {
            // Remove todo from user state
            const title: string = state.getValue('dialog.result.title');
            const todos: string[] = state.getValue('user.todos') || [];
            const pos = todos.indexOf(title);
            if (pos >= 0) {
                todos.splice(pos, 1);
            }
            state.setValue('user.todos', todos);
        }),
        new SendActivity(`Deleted the todo named "{dialog.result.title}". You can delete all your todos by saying "delete all todos".`),
    ]).else([
        new SendActivity(`No todos to delete.`)
    ])
]);
deleteToDoDialog.recognizer = cancelRecognizer;
deleteToDoDialog.addRule(new DoStepsRule('CancelIntent', [
    new CancelDialog('cancelDelete')
]))
bot.addDialog(deleteToDoDialog);

// ClearToDosDialog
const clearToDosDialog = new SequenceDialog('ClearToDosDialog', [
    new IfProperty(hasToDos, [
        new SetProperty(async (state) => {
            // Clear all todos in user state
            state.setValue('user.todos', []);
        }),
        new SendActivity(`All todos removed.`)
    ]).else([
        new SendActivity(`No todos to clear.`)
    ])
]);
bot.addDialog(clearToDosDialog);

// ShowToDosDialog
const showToDosDialog = new SequenceDialog('ShowToDosDialog', [
    new IfProperty(hasToDos, [
        new SendList('user.todos', `Here are your todos:`)
    ]).else([
        new SendActivity(`You have no todos.`)
    ])
]);
bot.addDialog(showToDosDialog);

//=============================================================================
// Helper Functions
//=============================================================================

async function hasToDos(state: DialogContextState): Promise<boolean> {
    const todos = state.getValue('user.todos');
    return Array.isArray(todos) && todos.length > 0;
}