/**
 * @module botbuilder-memory
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from 'botbuilder-core';
import { PropertyBase } from '../propertyBase';
import { DocumentAccessor } from '../documentAccessor';
import { IdFactory } from '../idFactory';
import { PropertyAccessor } from '../propertyAccessor';

export class NumberProperty extends PropertyBase<number> {

    public createAccessor(idOrFactory: string|IdFactory, parent: DocumentAccessor): PropertyAccessor<number> {
        // Clone property with new ID and parent.
        return this.copyTo(new NumberProperty(idOrFactory, parent));
    }

    protected async onHasChanged(context: TurnContext, value: number): Promise<boolean> {
        const id = await this.getId(context);
        const curValue = await this.parent.getPropertyValue(context, id);
        const hasValue = typeof curValue === 'number';
        if (typeof value === 'number') {
            if (hasValue) {
                return curValue !== value;
            } else {
                // We don't have anything assigned so return true
                return true;
            }
        } else {
            // We're being deleted so just return hasValue
            return hasValue;
        }
    }

    protected async onSet(context: TurnContext, value: number): Promise<void> {
        // Validate type being assigned
        const type = typeof value;
        if (type !== 'number' && type !== 'undefined') { throw new Error(`NumberProperty: invalid value assigned to property '${await this.getId(context)}'.`) }
        return super.onSet(context, value);
    }
}