'use strict';
import Command from "../Command/Command";

/**
 *
 *
 * @param {string} stateName
 * @param {Command[]} Commands array of Command objects
 *
 */
export default class State {
    public name: string;
    public Commands: Command<any, any>[];

    constructor(name: string, Commands: Command<any, any>[]){
        this.name = name;
        this.Commands = Commands;
    }

}

