'use strict';
import ChatModel from "../../models/ChatModel";

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param questions array of `qid` fields of `question` documents, otherwise all questions
 * @state leaves unchanged
 * @returns array of question documents that matched the request
 * 
 */
export default async function getQuestions(chatId: number, questions?: number[] | 'all') {


    const res = await ChatModel.findOne({ chatId: chatId })
        .select({ "_id": false, "Questions": true })
        .exec();

    const questionsFromDB = res?.Questions;

    if (Array.isArray(questions) && questions.length && questionsFromDB) {

        return questionsFromDB.filter((e) => questions.includes(e.qid)) || [];

    } else {

        return questionsFromDB || [];
    }

}
