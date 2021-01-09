'use strict';
import { Ichat } from "../../models/ChatModel";
import updateChat from "../functions/updateChat";
import setChatProperty from "./setChatProperty";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param datetime the time a next question will be asked
 */
export default async function setScheduledAsk(chatId: number, datetime: Date)
    : Promise<Ichat>
{

    return setChatProperty(chatId, {property: "next_question", value: new Date(datetime)});
    
    // // updateChat here, which is based on findOneAndUpdate(),
    // // returns a Chat document with values BEFORE assignment
    // return updateChat(chatId, {"next_question": datetime});

}

