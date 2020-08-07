'use strict';
import ChatModel from "../../models/ChatModel";
import QuestionModel from "../../models/QuestionModel";
import mongoose from "../../mongoose";

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

    return new Promise((resolve, reject)=>{
        ChatModel.findOne({ chatId: chatId })
        .select({ "_id": true, "Questions": true, "lastqid": true })
        .exec()
        .then(chat => {

            if (!chat){
                const error = new Error('tried to query Questions from the chat with chatId='+chatId+', which doesn\'t exist');
                console.error(error);
                reject(error);
                return;
            };

            
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


            chat.save()
            .then(chat => {
                resolve(chat);
            })
            .catch(error => {
                console.error('Error while trying to save chat doc! ', 'chatId = '+chatId);
                reject(error);
            });

        })
        .catch(error => {
            console.error('Error while trying to query chat doc! ', 'chatId = '+chatId);
            reject(error);
        });
        
    }); //return Promise


}


