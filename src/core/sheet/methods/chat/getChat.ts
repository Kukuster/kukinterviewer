'use strict';
import ChatModel, { Ichat_select, Ichat } from "../../models/ChatModel";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param select Specifies which document fields to include or exclude (also known as the query "projection")
 * @returns result of querying the Chat document
 * 
 */
export default async function getChat(chatId: number, select?: Ichat_select): Promise<Ichat | null> {
    return ChatModel.findOne({ chatId: chatId }).select(select).exec();
}
