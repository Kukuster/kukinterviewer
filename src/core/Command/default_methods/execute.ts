import Command from "../Command";

/**
 *
 * Sends recieved text in `args.text`
 *
 * @param {TelegramBot.Message} msg - received Message object from Telegram
 * @param {object} args - arguments prepared by `this.prepare` function
 * @return {Promise<string>}
 *
 */
export default async function default_execute(this: Command<any,any,any>, msg: any, args: Record<string, any>): Promise<string> {
    //console.log('default {Command_class}.execute');
    return JSON.stringify({
        result: 'dummy execute function response',
        args: args
    }, null, 2);
}

