import default_match   from "./default_methods/match";
import default_prepare from "./default_methods/prepare";
import default_execute from "./default_methods/execute";
import default_display from "./default_methods/display";
import { EventEmitter } from "events";
import { Model, Document } from "mongoose";
import monospace from "./prototype/monospace";
import ChatModel from "../sheet/models/ChatModel";
import QuestionModel from "../sheet/models/QuestionModel";


export interface IIChat {
    id: number;

    // [key: string]: any;
}

export interface IIUser {
    id: number,
    first_name: string,

    // [key: string]: any;
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
    
    //[ key: string ]: any;
}


export type Command_match           = (msg: IIMessage)                               => Promise<RegExpMatchArray|null>;
export type Command_prepare<Args>   = (msg: IIMessage, match: RegExpMatchArray)      => Promise<Args>;
export type Command_execute<Args>   = (msg: IIMessage, args: Args)                   => Promise<string>;
export type Command_display         = (msg: IIMessage, response: string)             => Promise<any>;


export interface ICommand {
    match:   Command_match; 
    prepare: Command_prepare<any>;
    execute: Command_execute<any>;
    display: Command_display;

    ChatModel?: Model<Document>;

    QuestionModel?: Model<Document>;
    
    botSendMessageOptions?: any; // TODO: figure out the type

    /**
     * Telegram formating: monospace text
     * Requires `parse_mode: 'Markdown'` option to be added to options object (3rd argument for bot.sendMessage method)
     */
    monospace: (str: string) => string;

    bot?: EventEmitter;


}

// export interface bot_interface extends EventEmitter {

// }

// export interface model_interface {
    
// }

export default class Command<Args> implements ICommand{
    public match:   Command_match; 
    public prepare: Command_prepare<Args>;
    public execute: Command_execute<Args>;
    public display: Command_display;
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
            match:    Command_match,
            prepare:  Command_prepare<Args>,
            execute:  Command_execute<Args>,
            display?: Command_display
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

    /**
     * an options object for bot.sentMessage function. usage:
     * this.bot.sendMessage(msg.from.id, "Hello, marked up world!", this.botSendMessageOptions);
     */
    public static botSendMessageOptions: any; // TODO: figure out the type

    /**
     * Telegram formating: monospace text
     * Requires `parse_mode: 'Markdown'` option to be added to options object (3rd argument for bot.sendMessage method)
     */
    public monospace: (str: string) => string = monospace;


    public static bot: EventEmitter;



}
