'use strict';
import ChatModel from "../models/ChatModel";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `null` by deleteing the entire chat document. This is equivalent to setting it to the default state
 * 
 */
export default async function deleteChat(chatId: number) {

    return ChatModel.deleteOne({ chatId: chatId })

}
