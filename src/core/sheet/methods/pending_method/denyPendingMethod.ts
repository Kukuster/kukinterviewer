'use strict';
import queryChat from "../functions/queryChat";

/**
 * 
 * Denies the execution of the pending sheet method that was set for awaiting for confirmation with `sheet.askConfirmation` (awaiting statically, in the db)
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to previous state (to whatever it was before asking to confirm the method)
 * 
 */
export default async function denyPendingMethod(chatId: number): Promise<void> {

    return queryChat(chatId, { "pending_method": true, "state": true }, async (chat, saveChat) => {
        const pendingMethod = chat.pending_method;

        if (pendingMethod){

            chat.state = pendingMethod.prev_state;
            chat.pending_method = null;
            saveChat();

            return;

        } else {
            return;
        }

    });

}
