'use strict';

import default_match   from "./default_methods/match";
import default_prepare from "./default_methods/prepare";
import default_execute from "./default_methods/execute";
import default_display from "./default_methods/display";
import { EventEmitter } from "events";
import { Model, Document } from "mongoose";
import ChatModel from "../sheet/models/ChatModel";
import QuestionModel from "../sheet/models/QuestionModel";


type TTChatType = 'private' | 'group' | 'supergroup' | 'channel';

export interface IIChat {
    id: number;
    type: TTChatType;
}

export interface IIUser {
    id: number,
    first_name: string,
    is_bot: boolean
}

export interface IIMessage {
    message_id: number;
    from?: IIUser;
    date: number;
    chat: IIChat;
    reply_to_message?: IIMessage;
    author_signature?: string;
    text?: string;
    reply_markup?: { inline_keyboard: any[][]; };
}


/**
 * @param ArgsPrep argument for the corresponding `Command_prepare` function
 */
export type Command_match<ArgsPrep>             = (msg: IIMessage)                      => Promise<ArgsPrep|null|undefined>;
/**
 * @param ArgsPrep argument for _this_ `Command_prepare` function
 * @param ArgsExec argument for the corresponding `Command_execute` function
 */
export type Command_prepare<ArgsPrep,ArgsExec>  = (msg: IIMessage, match: ArgsPrep)     => Promise<ArgsExec>;
/**
 * @param ArgsExec argument for _this_ `Command_execute` function
 * @param ArgsDisp argument for the corresponding `Command_display` function
 */
export type Command_execute<ArgsExec,ArgsDisp>  = (msg: IIMessage, args: ArgsExec)      => Promise<ArgsDisp>;
/**
 * @param ArgsDisp argument for the corresponding `Command_display` function
 */
export type Command_display<ArgsDisp>           = (msg: IIMessage, resonse: ArgsDisp)   => Promise<any>;


export interface ICommand {
    match:   Command_match<any>; 
    prepare: Command_prepare<any,any>;
    execute: Command_execute<any,any>;
    display: Command_display<any>;

    ChatModel?: Model<Document>;

    QuestionModel?: Model<Document>;

    bot?: EventEmitter;


}

// export interface bot_interface extends EventEmitter {

// }

// export interface model_interface {
    
// }

export default class Command<ArgsPrep, ArgsExec, ArgsDisp> implements ICommand{
    public match:   Command_match  <ArgsPrep>; 
    public prepare: Command_prepare<ArgsPrep,ArgsExec>;
    public execute: Command_execute<ArgsExec,ArgsDisp>;
    public display: Command_display<ArgsDisp>;
    /**
     * 
     * @param {Function} match Accepts {TelegramBot.Message} and returns message text or {RegExpMatchArray},
     * returns false-equvalent value if the message doesn't satistfy necessary conditions for executing the Command
     * @param {Function} prepare Accepts {RegExpMatchArray}
     * and processes it to and returns arguments for the execute method
     * @param {Function} execute Performes the core purpose of the Command.
     * Accepts preprocessed argumens instead of human-readable query (or however the Command was triggered)
     * Returns stringified object with result or error property for the display method
     * @param {Function} display Produces output of the result of execute method
     */
    constructor(
            match:    Command_match  <ArgsPrep>,
            prepare:  Command_prepare<ArgsPrep,ArgsExec>,
            execute:  Command_execute<ArgsExec,ArgsDisp>,
            display?: Command_display<ArgsDisp>
        ){
        this.match   = match   //? match   : default_match;
        this.prepare = prepare //? prepare : default_prepare;
        this.execute = execute //? execute : default_execute;
        this.display = display ? display : default_display;
    }


    public static ChatModel: Model<Document> = ChatModel;
    /**
     * a model for Question subdocuments created from a mongoose schema
     */
    public static QuestionModel: Model<Document> = QuestionModel;
    
    public static bot: EventEmitter;



}
