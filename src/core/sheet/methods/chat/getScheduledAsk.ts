'use strict';
import getChatProperty from "./getChatProperty";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param datetime the time a next question will be asked
 */
export default async function getScheduledAsk(chatId: number)
    : Promise<Date | undefined>
{

    return getChatProperty(chatId, "next_question");

}

