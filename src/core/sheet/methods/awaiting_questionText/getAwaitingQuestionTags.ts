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

    return queryChat(chatId, { "intermediate_data": true }, async (chat) => {
        
        if (chat.intermediate_data && chat.intermediate_data.awaiting_questionText) { 
            return chat.intermediate_data.awaiting_questionText.Tags;
        } else {
            return null;
        }

    });

}
