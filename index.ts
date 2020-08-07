'use strict';

import bot from "./bot";
import { decide } from "./Interpretation/decide";
import State from "./core/State/State";

bot.on("polling_error", (err) => console.log(err));

/**
 * temp mock
 */
const States: State[] = [];
/**
 * temp mock
 */
const greetState = new State('greet', []);


bot.on('message', (msg) => {
    // 'msg' is the received Message from Telegram

    console.log('recieved message:');
    console.log(msg);

    decide(msg, States, greetState);

});

