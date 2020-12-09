'use strict';
import queryChat from "../functions/queryChat";

/**
 * 
 * Gets Tags from chat.awaiting_questionText
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function getAwaitingQuestionTags(chatId: number): Promise<string[] | null> {

    return queryChat(chatId, { "awaiting_questionText": true }, async (chat) => {
        
        if (chat.awaiting_questionText) { 
            return chat.awaiting_questionText.Tags;
        } else {
            return null;
        }

    });

}
