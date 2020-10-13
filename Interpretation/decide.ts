'use strict';
import { IIMessage } from "../core/Command/Command";
import State from "../core/State/State";
import getChat from "../core/sheet/methods/chat/getChat";


/**
 * 
 * This function is used by the bot to decide what Command to execute depending on the recieved message and the current State
 * 
 * @param message recieved Telegram message
 * @param States an array of States supported by the app. Each State contains a string identifier and an array of Commands to check for
 * @param defaultState a State that is assumed by default if a user has no chat document in the DB (thus doesn't have state)
 * 
 * @returns Promise<void> if no Command was executed, Promise for a returned value from a `{Command}.display` method otherwise.
 * 
 */
export async function decide(message: IIMessage, States: State[], defaultState: State){
    const chatId = message.chat.id;

    const DB_chat = await getChat(chatId, { "state": true, "_id": false });

    let theState: State | undefined;
    

    if (!DB_chat){
        theState = defaultState;
    } else {

        if (!DB_chat.state) {
            console.error(new Error('ERROR while getting chat state. Got chat document object, but it has no *state* property'));
            return;
        };

        theState = States.find(s => s.name === DB_chat.state);

        if (!theState) {
            theState = defaultState;
        };

    };
   
    /**
     * Given the state and its array of Commands that the bot may expect,
     * decices which Command the message matches (by executing a Command's match method against the message)
     * if a match is found, proceed on doing .prepare, .execute, and .display for such Command
     * This is how the bot decides on the Command
    */
    for (const i in theState.Commands){
        let match;
        if ( match     = await theState.Commands[i].match  (message)){
            const args = await theState.Commands[i].prepare(message, match);
            const resp = await theState.Commands[i].execute(message, args);
                  return await theState.Commands[i].display(message, resp);
        };

    };


};
