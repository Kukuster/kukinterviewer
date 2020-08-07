'use strict';
import ChatModel from "../../models/ChatModel";
import mongoose from "../../mongoose";

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param questions a `qid` of a `question` document to delete, array of those, or 'all'
 * @state leaves unchanged
 * @returns array of question documents that matched the request
 * 
 */
export default async function deleteQuestions(chatId: number, questions: number[] | number | 'all') {

    const DBconnection = await mongoose.dbPromise;
    
    return new Promise((resolve,reject)=>{
        ChatModel.findOne({ chatId: chatId })
        .select( { "_id": true, "Questions": true } )
        .exec()
        .then(chat => {

            if (!chat) {
                const error = new Error('tried to query Questions from the chat with chatId=' + chatId + ', which doesn\'t exist');
                console.error(error);
                reject(error);
                return;
            };


            let deletedQuestions = [];


            if (!Array.isArray(chat.Questions)){
                chat.Questions = [];

            } else {

                const last = chat.Questions.length - 1;

                if (typeof questions === 'number'){
                    questions = [questions];
                }
                if (Array.isArray(questions)){
                    // a way to Array.prototype.filter(), except this rewrites existing array instead of returning new
                    for (var i = last; i >= 0; --i) {
                        if (questions.includes(chat.Questions[i].qid)) {
                            deletedQuestions.push(chat.Questions[i]);
                            chat.Questions.splice(i, 1);
                        }
                    }
                }
                if (questions === 'all'){
                    deletedQuestions = chat.Questions;
                    chat.Questions = [];
                }

            };


            chat.save()
                .then(chat => {
                    resolve(chat);
                })
                .catch(error => {
                    console.error('Error while trying to save chat doc!', 'chatId = '+chatId);
                    reject(error);
                });


        })
        .catch(error => {
            console.error('Error while trying to query chat doc! ', 'chatId = '+chatId);
            reject(error);
        })
    
    }); //return Promise
    


}
