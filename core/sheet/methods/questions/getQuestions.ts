'use strict';
import ChatModel from "../../models/ChatModel";
import { Iquestion } from "../../models/QuestionModel";


export type questionsQuery = {
    qids?:             [number, ...number[]],
    questionTextParts?:[string, ...string[]],
    enabled?:          boolean,
    Tags?:             [string, ...string[]]
};

/**
 * 
 * @param query an argument to `getQuestions` function
 * @returns whether _query_ is a `questionsQuery` type and has at least one property
 */
function isProperQuestionsQuery(query: number[] | 'all' | questionsQuery): query is questionsQuery {
    return (query as questionsQuery).qids!              !== undefined ||
           (query as questionsQuery).questionTextParts! !== undefined ||
           (query as questionsQuery).enabled!           !== undefined ||
           (query as questionsQuery).Tags!              !== undefined;
};

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param query array of `qid` fields of `question` documents, 'all' for all questions in Chat document, or a query object
 * @state leaves unchanged
 * @returns array of question documents that matched the request. Empty array if no questions matched
 * 
 */
export default async function getQuestions(chatId: number, query?: number[] | 'all' | questionsQuery):
Promise<Iquestion[]>
{

    return new Promise((resolve, reject) => {
        ChatModel.findOne({ chatId: chatId })
        .select({ "_id": false, "Questions": true })
        .exec()
        .then(chat => {

            if (!chat) {
                const error = new Error('tried to query Questions from the chat with chatId=' + chatId + ', which doesn\'t exist');
                console.error(error);
                reject(error);
                return;
            };

            const questionsFromDB = chat.Questions;

            if (!Array.isArray(questionsFromDB)) {
                resolve([]);
                return;
            };
            

            /* Depending on `query` type: */
        
            // if is array of numbers (qids)
            if (Array.isArray(query) && query.length){
                // console.log('is Array');
                resolve(questionsFromDB.filter(q => 
                    query.includes(q.qid)
                ));
            } 

            // if is questionsQuery
            else if (query && isProperQuestionsQuery(query)){
                // console.log('is questionsQuery');
                let filteringQuestions = questionsFromDB;

                // leave only those that match `enabled` field (if provided) and qids (if provided)
                if (query.qids !== undefined || query.enabled !== undefined){
                    // console.log('filtering by qids and enabled');
                    filteringQuestions = filteringQuestions.filter(q =>
                        ( query.qids === undefined    || query.qids!.includes(q.qid) )
                        &&
                        ( query.enabled === undefined || !!q.enabled === !!query.enabled )
                    );
                };
 
                // leave only those that have any of provided Tags (if provided)
                if (query.Tags !== undefined){
                    // console.log('filtering by Tags');
                    const validated_queryTags = query.Tags.filter(t => t!=='');
                    if (validated_queryTags.length > 0){
                        filteringQuestions = filteringQuestions.filter(q =>
                            validated_queryTags.some(t => q.Tags.includes(t))
                        );
                    };
                };

                // leave only those that contain any of provided strings (if provided)
                if (query.questionTextParts !== undefined) {
                    // console.log('filtering by questionTextParts');
                    let questionTextRegexps: RegExp[] = [];
                    query.questionTextParts.forEach(s => {
                        if (s){
                            questionTextRegexps.push(new RegExp(s, 'i'));
                        }
                    });

                    if (questionTextRegexps.length > 0){
                        filteringQuestions = filteringQuestions.filter(q =>
                            questionTextRegexps.some(r => q.questionText.match(r))
                        );
                    };
                };

                resolve(filteringQuestions);
                
            } // if is questionsQuery

            // if is 'all' or unset
            else if (query === 'all' || !query){
                // console.log('is \'all\'');
                resolve(questionsFromDB);
            } 
            
            else {
                // console.log('is neither (else)');
                resolve(questionsFromDB);
            };
            

        })
        .catch(error => {
            console.error(error);
        });
    });

}