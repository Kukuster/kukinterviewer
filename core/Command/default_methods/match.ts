import Command from "../Command";

/**
 *
 * Dummy "match" method: matches nothing, returns null
 *
 * @param {TelegramBot.Message} msg - received Message object from Telegram
 * @return {Promise<RegExpMatchArray|null>}
 *
 */
export default async function default_match(this: Command<any,any,any>, msg: any): Promise<RegExpMatchArray | null> {
    //console.log('default {Command_class}.match');
    //const message = msg.text;
    //return message.match(); // matches everything
    return null;
}

