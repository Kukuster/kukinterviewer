import Command from "../Command";

/**
 *
 * Prepares the matched text for `execute` function
 *
 * @param {TelegramBot.Message} msg - received Message object from Telegram
 * @param {RegExpMatchArray} match - return of the `match` method
 * @return {Promise<Object>}
 *
 */

export default async function default_prepare (this: Command<any,any,any>, msg: any, match: RegExpMatchArray): Promise<Record<string, any>> {
    //console.log('default {Command_class}.prepare');
    if (Array.isArray(match) && match.length) {
        return { match: match };
    } else {
        return {};
    }
}
