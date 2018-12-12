/**
 * @module botbuilder-memory
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from 'botbuilder-core';
import { IdFactory } from '../idFactory';

export interface CurrentConversationIdFactoryOptions {
    includeChannelId: boolean;
    includeUserId: boolean;
    separator: string;
}

export class CurrentConversationIdFactory implements IdFactory {
    public prefix: string;
    public options: CurrentConversationIdFactoryOptions;

    constructor(prefix = 'conversation', options?: Partial<CurrentConversationIdFactoryOptions>) {
        this.prefix = prefix;
        this.options = Object.assign({
            includeChannelId: false,
            includeUserId: false,
            separator: '-'
        } as CurrentConversationIdFactoryOptions, options);
    }

    public async getId(context: TurnContext): Promise<string> {
        let id = this.prefix;
        if (this.options.separator) { id += this.options.separator }
        if (this.options.includeChannelId) {
            id += context.activity.channelId;
            if (this.options.separator) { id += this.options.separator }
        }
        id += context.activity.conversation.id;
        if (this.options.includeUserId) {
            if (this.options.separator) { id += this.options.separator }
            id += context.activity.from.id;
        }
        return id;
    }
}