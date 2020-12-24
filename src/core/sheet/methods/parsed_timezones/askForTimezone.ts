'use strict';
import { Ichat } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";


/**
 * 
 * Saves the matched Timezones to the DB, changes the state to `'asking for timezone'` until the method confirmed
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param parsedTimezones number of timezones that matched the previous request, from which the user is asked to choose any
 * @state sets chat state to `'asking for timezone'`
 * @returns data that's saved to chat (`chat.intermediate_data` and `chat.state`)
 * 
 */
export default async function askForTimezone(chatId: number, parsedTimezones: string[])
    : Promise<Ichat>
{

    return queryChat(chatId, {"intermediate_data": true, "state": true}, (chat, saveChat) => {

        if (parsedTimezones && parsedTimezones.length) {
            if (!chat.intermediate_data){
                chat.intermediate_data = {};
            }

            chat.intermediate_data.parsed_timezones = parsedTimezones;

            chat.markModified('intermediate_data');
            saveChat();
        }

        if (chat.state !== 'asking for timezone') {
            chat.state  =  'asking for timezone';
            chat.markModified('intermediate_data');
            saveChat();
        }

        return chat;

    });
    
}
