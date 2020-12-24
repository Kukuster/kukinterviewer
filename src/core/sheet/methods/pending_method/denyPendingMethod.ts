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

    return queryChat(chatId, { "intermediate_data": true, "state": true }, async (chat, saveChat) => {
        const pendingMethod = chat.intermediate_data!.pending_method;

        if (pendingMethod){

            chat.state = pendingMethod.prev_state;
            if (!chat.intermediate_data) {
                chat.intermediate_data = {};
            }
            chat.intermediate_data.pending_method = null;
            chat.markModified('intermediate_data');
            saveChat();

            return;

        } else {
            return;
        }

    });

}
