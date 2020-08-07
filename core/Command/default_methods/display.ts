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
export default async function default_display(this: Command<any>, msg: IIMessage, response: string): Promise<any> {
    //console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log(JSON.parse(response));
    // console.log('this.bot:');
    //console.log(this.bot);
    //return this.bot.sendMessage(chatId, this.monospace(response), this.botSendMessageOptions);
}
