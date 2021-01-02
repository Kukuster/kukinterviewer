'use strict';
import { Ichat, Ichat_withNonEmptyFields } from "../../models/ChatModel";
import { confirmableSheetMethod } from "../../sheet";
import queryChat from "../functions/queryChat";


/**
 * 
 * Saves: 
 * - the given method, 
 * - it's serialized arguments,
 * - the current state
 * 
 * to the DB, changes the state to `'pending confirmation'` until the method confirmed or denied
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'pending confirmation'`
 * @returns data that's saved to chat (`chat.pending_method` and `chat.state`)
 * 
 */
export default async function askConfirmation(chatId: number, method: confirmableSheetMethod, args_serialized: string)
    : Promise<Ichat_withNonEmptyFields<'intermediate_data'>>
{

    return queryChat(chatId, {"intermediate_data": true, "state": true}, (chat, saveChat) => {

        if (!chat.intermediate_data){
            chat.intermediate_data = {};
        }
        chat.intermediate_data.pending_method = {
            prev_state: chat.state,
            sheet_method: method,
            args_tuple: args_serialized
        };

        chat.state = "pending confirmation";

        chat.markModified('intermediate_data');
        saveChat();

        return chat as Ichat_withNonEmptyFields<'intermediate_data'>;

    });    

}
