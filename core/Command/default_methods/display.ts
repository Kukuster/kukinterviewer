import Command, { IIMessage } from "../Command";
import { anyJSONvalue } from "../../anyJSONvalue.type";

/**
 *
 * Displays the result of executing the command
 * 
 * @param {TelegramBot.Message} msg - received Message object from Telegram
 * @param {string} response The return of execute function
 * @return {Promise<any>}
 *
 */
export default async function default_display(this: Command<any,any>, msg: IIMessage, response: any): Promise<any> {
    //console.log('default {Command_class}.display');
    const chatId = msg.chat.id;
    console.log(JSON.stringify(response), null, 2);

    // console.log('this.bot:');
    //console.log(this.bot);

    //return this.bot.sendMessage(chatId, this.monospace(response), this.botSendMessageOptions);
}
