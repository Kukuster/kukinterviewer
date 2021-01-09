'use strict';
import { Ichat } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";


/**
 * 
 * Saves the mentioned Tags to the DB, changes the state to `'awaiting questionText'` until the method confirmed or denied
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param Tags tags to add to the awaiting Tags list, while waiting for a questionText
 * @state sets chat state to `'awaiting questionText'`
 * @returns data that's saved to chat (`chat.awaiting_questionText` and `chat.state`)
 * 
 */
export default async function askForQuestionText(chatId: number, Tags?: string[])
    : Promise<Ichat>
{

    return queryChat(chatId, {"intermediate_data": true, "state": true}, (chat, saveChat) => {

        if (Tags && Tags.length) {
            if (!chat.intermediate_data){
                chat.intermediate_data = {};
            }

            if (chat.intermediate_data.awaiting_questionText && chat.intermediate_data.awaiting_questionText.Tags) {
                chat.intermediate_data.awaiting_questionText.Tags.push(...Tags);
            } else {
                chat.intermediate_data.awaiting_questionText = {
                    Tags: Tags || []
                };
            }

            chat.markModified('intermediate_data');
            saveChat();
        }

        if (chat.state !== 'awaiting questionText') {
            chat.state  =  'awaiting questionText';
            chat.markModified('intermediate_data');
            saveChat();
        }

        return chat;

    });
    
}
