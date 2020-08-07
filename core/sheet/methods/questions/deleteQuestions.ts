'use strict';
import queryChat from "../functions/queryChat";

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param questions a `qid` of a `question` document to delete, array of those, or 'all'
 * @state leaves unchanged
 * @returns array of question documents that matched the request
 * 
 */
export default async function deleteQuestions(chatId: number, questions: number[] | number | 'all') {


    return queryChat(chatId, { "_id": true, "Questions": true }, (chat, save)=>{

        let deletedQuestions = [];


        if (!Array.isArray(chat.Questions)) {
            chat.Questions = [];

        } else {

            const last = chat.Questions.length - 1;

            if (typeof questions === 'number') {
                questions = [questions];
            }
            if (Array.isArray(questions)) {
                // a way to Array.prototype.filter(), except this rewrites existing array instead of returning new
                for (var i = last; i >= 0; --i) {
                    if (questions.includes(chat.Questions[i].qid)) {
                        deletedQuestions.push(chat.Questions[i]);
                        chat.Questions.splice(i, 1);
                    }
                }
            }
            if (questions === 'all') {
                deletedQuestions = chat.Questions;
                chat.Questions = [];
            }

        };

        save();
        return chat;
    });


}
