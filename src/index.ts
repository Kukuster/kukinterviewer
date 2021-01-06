'use strict';

// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

import { bot } from "./bot";
import { decide } from "./Interpretation/decide";
import States, { defaultState } from "./Interpretation/States";
import { DBconnection } from "./core/sheet/mongoose";
import server from "./server";
import scheduleQuestionsForEveryone from "./core/sheet/methods/scheduleQuestionsForEveryone";
import { TZ } from "./conf";

process.env.TZ = TZ;

DBconnection;
server;

bot.on("polling_error", (err) => console.log(err));


bot.on('message', (msg) => {
    // 'msg' is the received Message from Telegram

    console.log('recieved message:');
    console.log(msg);
    console.log();

    if (!msg.text) {
        if (msg.sticker && msg.sticker.emoji) {
            msg.text = msg.sticker.emoji;
        }
    }

    decide(msg, States, defaultState);

});


// REschedules questions for everyone on start
scheduleQuestionsForEveryone();

