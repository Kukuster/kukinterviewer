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
    public Commands: Command[];

    constructor(name: string, Commands: Command[]){
        this.name = name;
        this.Commands = Commands;
    }

}

