import { BotErrors, botPromise } from "./bot";
import { decide } from "../Interpretation/decide";
import States, { defaultState } from "../Interpretation/States";
import scheduleQuestionsForEveryone from "../core/sheet/methods/scheduleQuestionsForEveryone";
import * as config from "../conf";
import httpsGetJSON from "../reusable/httpsGetJSON";
import { isNotPrimitive } from "../reusable/isPrimitive";


const getWebhookInfo_url = `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`;

/**
 * starts a bot app, makes sure botPromise successfully resolves to a bot instance
 */
export default async () => {

    const bot = await botPromise;


    /**
     * try to validate TOKEN through telegram API
     */
    try {
        const webhook = httpsGetJSON(getWebhookInfo_url.replace('<TOKEN>', await config.TOKEN));
        const data = (await webhook).parsedData;
        if (isNotPrimitive(data) && Object.hasOwnProperty.call(data, 'ok') && data.ok && data.ok !== 'false'){
            const url = Object.hasOwnProperty.call(data, 'result') && data.result.url;
            console.log(`bot: instantiated Telegram bot, validated TOKEN${url?`. (webhook url set to "${url}"`:''}`);
        } else {
            throw BotErrors.failedToValidateTOKEN;
        }
    } catch (e) {
        BotErrors.failedToValidateTOKEN.message = e.message;
        BotErrors.failedToValidateTOKEN.name    = e.name;
        BotErrors.failedToValidateTOKEN.stack   = e.stack;
        throw BotErrors.failedToValidateTOKEN;
    }


    const APP_ENV = await config.APP_ENV;


    bot.on("polling_error", (err) => console.log(err));


    /**
     * @param msg the received Message object from Telegram
     * @param meta some metadata of the recieved message
     */
    bot.on('message', (msg, meta) => {
        // 'msg' is the received Message object from Telegram

        if (APP_ENV === 'dev') {
            console.log(`recieved message from chat ${msg.chat.id}:`);
            console.log({msg, meta});
            console.log();
        } else {
            const user = msg.from?.username ? `chatId=${msg.chat.id} (@${msg.from?.username})` : msg.chat.id;
            const type = meta.type;
            const text = msg.text;
            console.log(`recieved message: `,{user, type, text});
        }

        // if message is simply a sticker, interpret is as a text with an emoji that corresponds to the sticker
        if (!msg.text) {
            if (msg.sticker && msg.sticker.emoji) {
                msg.text = msg.sticker.emoji;
            }
        }

        decide(msg, States, defaultState);

    });


    /**
     * REschedules questions for everyone on start
     */
    const { rescheduled_count, totalChats_count } = await scheduleQuestionsForEveryone();
    console.log(`bot: rescheduled questions for ${rescheduled_count} of ${totalChats_count} chats`);

    return bot;


};
