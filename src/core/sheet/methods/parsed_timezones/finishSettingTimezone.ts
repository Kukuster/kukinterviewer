'use strict';
import { convertTimeOfDayFromTZ } from "../../../../reusable/datetime";
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


        ///// temporary fix /////
        // sets default settings: ask every 2 hours from 10 AM to 8 PM
        const twoHrs  =  7200000;
        const tenAM   = 36000000;
        const eightPM = 72000000;

        const clientsTenAM_in_GMT   = convertTimeOfDayFromTZ(tenAM,   timezone);
        const clientsEightPM_in_GMT = convertTimeOfDayFromTZ(eightPM, timezone);

        chat.Settings.asking_period_ms = twoHrs;
        chat.Settings.asking_timeOfDay_from = clientsTenAM_in_GMT;
        chat.Settings.asking_timeOfDay_to   = clientsEightPM_in_GMT;

        ///// /////


        chat.markModified('intermediate_data');
        chat.markModified('Settings');
        console.log(`executing finishSettingTimezone`);
        
        saveChat();

        return chat;

    });

}
