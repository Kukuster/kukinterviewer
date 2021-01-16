'use strict';

import default_display from "./default_methods/display";
import { EventEmitter } from "events";
import { Model, Document } from "mongoose";
import ChatModel from "../sheet/models/ChatModel";
import QuestionModel from "../sheet/models/QuestionModel";
import { IIMessage } from "../../bot/botlib";



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


export default class Command<ArgsPrep, ArgsExec, ArgsDisp> implements ICommand {
    public match:   Command_match  <ArgsPrep>; 
    public prepare: Command_prepare<ArgsPrep,ArgsExec>;
    public execute: Command_execute<ArgsExec,ArgsDisp>;
    public display: Command_display<ArgsDisp>;
    /**
     * 
     * All 4 methods accept {IIMessage} as the first argument and return promise.
     * 
     * @param {Function} match Performs a test on the given message: whether this message is a request for this Command
     * returns non-nullish value if the Command "matches" the message, usually, with the data of how exactly it matches (and how to execute the Command),
     * returns nullish value if the message doesn't satistfy necessary conditions for executing the Command
     * 
     * @param {Function} prepare Accepts match method's result and processes it with the message into proper arguments object for the execute method.
     * This method's purpose is only to form the arguments for the execute method.
     * Other calculations, especially external requests should be in the execute method.
     * 
     * @param {Function} execute Performes the core purpose of the Command.
     * Accepts preprocessed argumens instead of the message request.
     * Returns a result of the execution.
     * All (or most) external requests should be performed in this method.
     * 
     * @param {Function} display Produces output of the result of execute method, however defined
     */
    constructor (
            match:    Command_match  <ArgsPrep>,
            prepare:  Command_prepare<ArgsPrep,ArgsExec>,
            execute:  Command_execute<ArgsExec,ArgsDisp>,
            display?: Command_display<ArgsDisp>
        ){
        this.match   = match;
        this.prepare = prepare;
        this.execute = execute;
        this.display = display ? display : Command.default_display;
    }


    public static ChatModel: Model<Document> = ChatModel;
    /**
     * a model for Question subdocuments created from a mongoose schema
     */
    public static QuestionModel: Model<Document> = QuestionModel;
    
    public static bot: EventEmitter;

    public static default_display: Command_display<any> = default_display;

}
