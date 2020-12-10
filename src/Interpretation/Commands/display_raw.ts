'use strict';
import TelegramBot, { monospace, prepareMessages_fromSnippets, sendMessageError, sendMessageSafely } from "../../bot";
import Command, { IIMessage } from "../../core/Command/Command";

/**
 *
 * Displays the result of executing the command
 *
 */
export default async function display_raw<T>(this: Command<unknown, unknown, unknown>, msg: IIMessage, response: T)
    : Promise<(TelegramBot.Message | sendMessageError)[]>
{
    console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log('response: ', response);
    
    
    return sendMessageSafely(chatId, JSON.stringify(response, null, 2), {
        separator: '\n\n',
        processRightBeforeSend_Markdown: monospace,
    });

}
