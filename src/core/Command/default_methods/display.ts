'use strict';
import bot, { monospace } from "../../../bot";
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
export default async function default_display(this: Command<any,any,any>, msg: IIMessage, response: any): Promise<any> {
    //console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log(JSON.stringify(response, null, 2));

    // console.log('bot:');
    // console.log(bot);

    return bot.sendMessage(chatId, monospace(JSON.stringify(response, null, 2)), {
        parse_mode: 'Markdown'
    });
};
