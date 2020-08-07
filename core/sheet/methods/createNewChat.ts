'use strict';
import ChatModel from "../models/ChatModel";
import mongoose from "../mongoose";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to `'ready'`
 * 
 */
export default async function createNewChat(chatId: number){

    return new ChatModel({
        _id: new (await mongoose.dbPromise).Types.ObjectId(),
        chatId: chatId,
        Questions: [],
        lastqid: 0,
        Pending_to_delete: [],
        Settings: {
            enabled: false,
            //timezone: undefined,
            //asking_period_mins: 120,
            //asking_time_of_day: { from_hour: 10, to_hour: 18 }
        },
        //last_time_asked: new Date(),
        //running: false,
        state: 'ready',
        //Schedule: { qid: -1, datetime: new Date() }
    }).save()

}
