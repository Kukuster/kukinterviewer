import { bot } from "./bot";
import { decide } from "./Interpretation/decide";
import States, { defaultState } from "./Interpretation/States";
import scheduleQuestionsForEveryone from "./core/sheet/methods/scheduleQuestionsForEveryone";
import { APP_ENV } from "./conf";


export default async () => {

    bot.on("polling_error", (err) => console.log(err));


    bot.on('message', (msg) => {
        // 'msg' is the received Message from Telegram

        if (APP_ENV === 'dev'){
            console.log(`recieved message from chat ${msg.chat.id}:`);
            console.log(msg);
            console.log();
        }

        if (!msg.text) {
            if (msg.sticker && msg.sticker.emoji) {
                msg.text = msg.sticker.emoji;
            }
        }

        decide(msg, States, defaultState);

    });


    // REschedules questions for everyone on start
    const { rescheduled_count, totalChats_count } = await scheduleQuestionsForEveryone();
    console.log(`rescheduled questions for ${rescheduled_count} of ${totalChats_count} chats`);

};
