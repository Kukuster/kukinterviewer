'use strict';
import queryChat from "../functions/queryChat";

/**
 * 
 * Gets Timezones from chat.intermediate_data.parsed_timezones
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function getAwaitingParsedTimezones(chatId: number): Promise<string[] | null> {

    return queryChat(chatId, { "intermediate_data": true }, async (chat) => {
        
        if (chat.intermediate_data && chat.intermediate_data.parsed_timezones) {
            return chat.intermediate_data.parsed_timezones;
        } else {
            return null;
        }

    });

}
