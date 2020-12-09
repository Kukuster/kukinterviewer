'use strict';
import queryChat from "../functions/queryChat";

/**
 * 
 * Finishes the execution of addQuestion method that was set to awaiting for questionText with `sheet.askForQuestionText` (awaiting statically, in the db)
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function finishAddingQuestionText(chatId: number): Promise<boolean> {

    return queryChat(chatId, { "awaiting_questionText": true, "state": true }, async (chat, saveChat) => {

        chat.state = 'ready';
        chat.awaiting_questionText = null;
        saveChat();

        return true;

    });

}
