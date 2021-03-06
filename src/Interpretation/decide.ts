'use strict';
import { IIMessage } from "../bot/botlib";
import getChat from "../core/sheet/methods/chat/getChat";
import State from "../core/State/State";
import { ArrayElement } from "../reusable/ArrayElement.type";


/**
 * 
 * This function is used by the bot to decide what Command to execute depending on the recieved message and the current State
 * @param message recieved Telegram message
 * @param States an array of possible states to consider. Each State contains a string identifier and an array of Commands to check for if in its state
 * @param defaultState a State that is assumed by default if a user has no chat document in the DB (thus doesn't have state)
 * 
 * @returns Promise<void> if no Command was executed, Promise for a returned value from a `{Command}.display` method otherwise.
 * 
 */
export async function decide <A extends readonly State<any>[], S extends ArrayElement<A>>
    (message: IIMessage, States: A, defaultState: S)
    : Promise<any>
{
    const chatId = message.chat.id;

    const DB_chat = await getChat(chatId, { "state": true, "_id": false });

    let theState: ArrayElement<A> | undefined;
    

    if (!DB_chat){
        theState = defaultState;
    } else {

        if (!DB_chat.state) {
            console.error(new Error('ERROR while getting chat state. Got chat document object, but it has no *state* property'));
            return;
        }

        theState = States.find(s => s.name === DB_chat.state);

        if (!theState) {
            theState = defaultState;
        }

    }
   
    /**
     * Given the state and its array of Commands that the bot may expect,
     * decices which Command the message matches (by executing a Command's match method against the message)
     * if a match is found, proceed on doing .prepare, .execute, and .display for such Command
     * This is how the bot decides on the Command
    */
    for (const i in theState.Commands){
        // console.log(`trying '${theState.name}'.Command[${i}]`);
        let match;
        if ( match     = await theState.Commands[i].match  (message)){
            const args = await theState.Commands[i].prepare(message, match);
            const resp = await theState.Commands[i].execute(message, args);
                  return await theState.Commands[i].display(message, resp);
        }

    }


}
