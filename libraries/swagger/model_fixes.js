// replace.js

var fs = require('fs');
var replace = require('replace-in-file');

var modelsPaths = './generated/models/index.ts';
var optionalModelProperties = {
    'Activity':                 ['id', 'timestamp', 'localTimestamp', 'textFormat', 'attachmentLayout', 'membersAdded', 'membersRemoved', 'reactionsAdded', 'reactionsRemoved', 'topicName', 'historyDisclosed', 'locale', 'speak', 'inputHint', 'summary', 'suggestedActions', 'attachments', 'entities', 'channelData', 'action', 'replyToId', 'value', 'name', 'relatesTo', 'code', 'expiration', 'importance', 'deliveryMode', 'textHighlights'],
    'ConversationReference':    ['activityId', 'user'],
    'ConversationParameters':   ['members', 'topicName'],
    'SigninCard':               ['text'],
    'Attachment':               ['content', 'contentUrl', 'name', 'thumbnailUrl'],
    'CardImage':                ['alt', 'tap'],
    'CardAction':               ['image', 'displayText', 'text'],
    'MediaUrl':                 ['profile']
};

var replaceOptions = [
    {
        "files":    "generated/**/*.ts",
        "from":     "as Models from \"./models\"",
        "to":       "as Models from \"botbuilder-schema\""
    }, {
        "files":    "generated/**/*.ts",
        "from":     "as Models from \"../models\"",
        "to":       "as Models from \"botbuilder-schema\""
    }, {
        "files":    "generated/models/index.ts",
        "from":     "\/*\n * Code generated by Microsoft (R) AutoRest Code Generator.\n * Changes may cause incorrect behavior and will be lost if the code is\n * regenerated.\n *\/",
        "to":       "\/**\n * @module botbuilder-schema\n *\/\n\/**\n * Copyright (c) Microsoft Corporation. All rights reserved.  \n * Licensed under the MIT License.\n *\/"
    }, {
        "files":    "generated/**/*.ts",
        "from":     "\/*\n * Code generated by Microsoft (R) AutoRest Code Generator.\n * Changes may cause incorrect behavior and will be lost if the code is\n * regenerated.\n *\/",
        "to":       "\/**\n * @module botframework-connector\n *\/\n\/**\n * Copyright (c) Microsoft Corporation. All rights reserved.  \n * Licensed under the MIT License.\n *\/"
    }
];

function replaceNext() {
    if (replaceOptions.length === 0) {
        return Promise.resolve();
    }

    return replace(replaceOptions.shift())
        .then(changes => {
            return replaceNext();
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

function fixModelsProps(models, optionalModelProperties) {

    // 1. Make all properties required
    // name: string;
    models = models.replace(/\?: /g, ': ');

    // 2. Make some properties optional
    // id?: string;
    Object.keys(optionalModelProperties).forEach(modelName => {
        var requiredProperties = optionalModelProperties[modelName];

        var startIx = models.indexOf(`export interface ${modelName} {`);
        var endIx = models.indexOf('\n}', startIx) + 2;
        var model = models.substring(startIx, endIx);

        var updated = requiredProperties.reduce(
            (updated, propName) => updated.replace(`${propName}: `, `${propName}?: `),
            model);

        // console.log(interfaceName, 'OLD:\n', model, 'UPDATED:\n', updated);

        models = models.substring(0, startIx) + updated + models.substring(endIx);
    });

    return models;
}

replaceNext().then(() => {
    var models = fs.readFileSync(modelsPaths, 'UTF8');
    var updatedModels = fixModelsProps(models, optionalModelProperties);
    fs.writeFileSync(modelsPaths, updatedModels, { encoding: 'UTF8' });
    console.log('Model fixes completed.');
});