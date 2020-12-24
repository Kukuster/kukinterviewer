'use strict';
import ChatModel from "../../models/ChatModel";
import { DBconnection } from "../../mongoose";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function createNewChat(chatId: number, args: { state: string }) {

    return new ChatModel({
        _id: new (await DBconnection).Types.ObjectId(),
        chatId: chatId,
        Questions: [],
        lastqid: 0,
        Tags: [],
        Settings: {
            enabled: false,
        },
        //last_time_asked: new Date(),
        state: args.state,
        intermediate_data: {},
    }).save();

}
