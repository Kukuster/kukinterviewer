'use strict';
import TelegramBot, { monospace, bot } from "../../bot";
import Command, { IIMessage } from "../../core/Command/Command";

/**
 *
 * Displays the result of executing the command
 *
 */
export default async function display_raw<T>(this: Command<unknown,unknown,unknown>, msg: IIMessage, response: T): Promise<TelegramBot.Message> {
    //console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log('response: ');
    console.log(response);

    return bot.sendMessage(chatId, monospace(JSON.stringify(response, null, 2)), {
        parse_mode: 'Markdown'
    });
}
