'use strict';
import ChatModel from "../models/ChatModel";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @returns whether the Chat document exists or not
 * 
 */
export default async function hasChat(chatId: number): Promise<boolean>{
    const res = await ChatModel.find({ chatId: chatId }).select({ "_id": true }).exec();
    return (res.length && res[0]._id)
}
