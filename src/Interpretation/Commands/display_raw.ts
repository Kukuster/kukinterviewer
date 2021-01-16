'use strict';
import TelegramBot, { sendMessageSafely } from "../../bot/bot";
import { IIMessage, monospace, sendMessageError } from "../../bot/botlib";

/**
 *
 * Displays the result of executing the command
 *
 */
export default async function display_raw<T>(msg: IIMessage, response: T)
    : Promise<(TelegramBot.Message | sendMessageError)[]>;
export default async function display_raw<T>(chatId: number, response: T)
    : Promise<(TelegramBot.Message | sendMessageError)[]>;
export default async function display_raw<T>(msg_or_chatId: IIMessage | number, response: T)
    : Promise<(TelegramBot.Message | sendMessageError)[]>
{
    console.log('default {Command_class}.display');
    const chatId = typeof msg_or_chatId === 'number' ? msg_or_chatId : msg_or_chatId.chat.id;
    console.log('response: ', response);
    
    
    return sendMessageSafely(chatId, JSON.stringify(response, null, 2), {
        separator: '\n\n',
        parse_mode: 'Markdown',
        processRightBeforeSend_Markdown: monospace,
    });

}
