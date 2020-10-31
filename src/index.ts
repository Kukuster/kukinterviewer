'use strict';

// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

import bot from "./bot";
import { decide } from "./Interpretation/decide";
import State from "./core/State/State";
import States from "./Interpretation/States"
import greetState from "./Interpretation/States/greet";
import mongoose from "./core/sheet/mongoose";
import server from "./server";


mongoose.dbPromise;
server;

bot.on("polling_error", (err) => console.log(err));


bot.on('message', (msg) => {
    // 'msg' is the received Message from Telegram

    console.log('recieved message:');
    console.log(msg);
    console.log();

    decide(msg, States, greetState);

});

