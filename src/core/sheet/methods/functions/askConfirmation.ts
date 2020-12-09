'use strict';
import { Ichat } from "../../models/ChatModel";
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
    : Promise<Ichat>
{

    return queryChat(chatId, {"pending_method": true, "state": true}, (chat, saveChat) => {

        chat.pending_method = {
            prev_state: chat.state,
            sheet_method: method,
            args_tuple: args_serialized
        };

        chat.state = "pending confirmation";

        saveChat();

        return chat;

    });    

}
