'use strict';
import { Ichat } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";


/**
 * 
 * Saves the mentioned Tags to the DB, changes the state to `'awaiting questionText'` until the method confirmed or denied
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'awaiting questionText'`
 * @returns data that's saved to chat (`chat.awaiting_questionText` and `chat.state`)
 * 
 */
export default async function askForQuestionText(chatId: number, Tags?: string[])
    : Promise<Ichat>
{

    return queryChat(chatId, {"awaiting_questionText": true, "state": true}, (chat, saveChat) => {

        if (Tags && Tags.length &&
            chat.awaiting_questionText && chat.awaiting_questionText.Tags) {
            chat.awaiting_questionText.Tags.push(...Tags);
        } else {
            chat.awaiting_questionText = {
                Tags: Tags || []
            };
        }

        chat.state = 'awaiting questionText';

        saveChat();

        return chat;

    });
    
}
