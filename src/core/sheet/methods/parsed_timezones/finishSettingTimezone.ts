'use strict';
import { Ichat } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";

/**
 * 
 * Finishes the execution of addQuestion method that was set to awaiting for questionText with `sheet.askForQuestionText` (awaiting statically, in the db)
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function finishSettingTimezone(chatId: number, timezone: string): Promise<Ichat> {

    return queryChat(chatId, { "intermediate_data": true, "state": true, "Settings": true }, async (chat, saveChat) => {

        chat.state = 'ready';
        if (chat.intermediate_data){
            chat.intermediate_data.parsed_timezones = null;
        }
        chat.Settings.timezone = timezone;

        chat.markModified('intermediate_data');
        chat.markModified('Settings');
        
        saveChat();

        return chat;

    });

}
