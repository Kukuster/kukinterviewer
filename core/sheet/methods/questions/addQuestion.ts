'use strict';
import QuestionModel from "../../models/QuestionModel";
import mongoose from "../../mongoose";
import queryChat from "../functions/queryChat";

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param question a question document to add. Sets a question to be enabled by default
 * @state leaves unchanged
 * @returns return of `save()` when saving `chat` document, or an error if any occured on the way
 * 
 */
export default async function addQuestion(chatId: number, question: { questionText: NonNullable<string>, Tags?: string[], enabled?: boolean }) {

    const DBconnection = await mongoose.dbPromise;

    return queryChat(chatId, {}, (chat, save)=>{

        chat.lastqid = chat.lastqid ? chat.lastqid+1 : 1;

        const newQuestion = new QuestionModel({
            _id: new DBconnection.Types.ObjectId(),
            qid: chat.lastqid,
            questionText: question.questionText,
            Tags: 
                Array.isArray(question.Tags) && question.Tags.length ? 
                    question.Tags :
                    [],
            enabled:
                question.enabled === undefined ?
                    true :
                    !!question.enabled
        });


        if (!Array.isArray(chat.Questions)) {
            chat.Questions = [];
        };

        chat.Questions.push(newQuestion);

        save();

        return chat;
    });

}


