'use strict';
import Command, { IIMessage } from "../Command";

/**
 *
 * Displays the result of executing the command
 * 
 * @param {TelegramBot.Message} msg - received Message object from Telegram
 * @param {string} response The return of execute function
 * @return {Promise<any>}
 *
 */
export default async function default_display<T>(this: Command<any,any, T>, msg: IIMessage, response: T): Promise<string> {
    //console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log(JSON.stringify(response, null, 2));

    return JSON.stringify(response, null, 2);
};
