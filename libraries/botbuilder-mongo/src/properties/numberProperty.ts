/**
 * @module botbuilder-planning
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from 'botbuilder-core';
import { SimpleProperty } from './simpleProperty';

export class NumberProperty extends SimpleProperty<number> {

    public clone(obj?: this): this {
        if (!obj) { obj = new NumberProperty() as this }
        return super.clone(obj);
    }

    protected async onHasChanged(context: TurnContext, value: number): Promise<boolean> {
        const curValue = await this.parent.getPropertyValue(context, this.name);
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
        // Validate that a number is being assigned
        const type = typeof value;
        if (type !== 'number' && type !== 'undefined') { throw new Error(`NumberProperty: invalid value assigned to property '${this.name}'.`) }
        return super.onSet(context, value);
    }
}