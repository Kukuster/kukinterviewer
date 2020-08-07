'use strict';

import bot from "./bot";
import { decide } from "./Interpretation/decide";
import State from "./core/State/State";
import States from "./Interpretation/States"
import greetState from "./Interpretation/States/greet";

bot.on("polling_error", (err) => console.log(err));


bot.on('message', (msg) => {
    // 'msg' is the received Message from Telegram

    console.log('recieved message:');
    console.log(msg);

    decide(msg, States, greetState);

});

