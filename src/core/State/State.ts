'use strict';
import Command from "../Command/Command";

/**
 *
 *
 * @param {string} stateName
 * @param {Command[]} Commands array of Command objects
 *
 */
export default class State<T extends string> {
    public name: T;
    public Commands: Command<any, any, any>[];

    constructor(name: T, Commands: Command<any, any, any>[]){
        this.name = name;
        this.Commands = Commands;
    }

}

