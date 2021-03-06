'use strict';
import QuestionModel from "../../models/QuestionModel";
import { DBconnection } from "../../mongoose";
import queryChat from "../functions/queryChat";
import { validateTags } from "../functions/hashtag";
import TagModel from "../../models/TagModel";
import { Ichat_withNonEmptyFields } from "../../models/ChatModel";

/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param question a question document to add. Sets a question to be enabled by default
 * @state leaves unchanged
 * @returns return of `save()` when saving `chat` document, or an error if any occured on the way
 * 
 */
export default async function addQuestion(chatId: number, question: { questionText: NonNullable<string>, Tags?: string[], enabled?: boolean })
    : Promise<Ichat_withNonEmptyFields<'Questions' | 'lastqid'>>
{

    const connectedDB = await DBconnection;

    return queryChat(chatId, {"Questions": true, "lastqid": true, "Tags": true}, (chat, save)=>{

        const chatQuestions = Array.isArray(chat.Questions)? chat.Questions: [];
        const chatTags      = Array.isArray(chat.Tags)     ? chat.Tags     : [];
        const questionTags  = Array.isArray(question.Tags) ? validateTags(question.Tags) : [];


        chat.lastqid = chat.lastqid ? chat.lastqid+1 : 1;

        const newQuestion = new QuestionModel({
            _id: new connectedDB.Types.ObjectId(),
            qid: chat.lastqid,
            questionText: question.questionText,
            Tags: 
                questionTags.length ? 
                    questionTags :
                    [],
            enabled:
                question.enabled === undefined ?
                    true :
                    !!question.enabled
        });

        chatQuestions.push(newQuestion);


        // if there are new, add tags to the Tags list
        if (questionTags.length){
            for (let i = 0; i < questionTags.length; i++){
                if (!chatTags.some(t => t.str === questionTags[i]) ){
                // if a new question's tag is absent in the Tags list
                    // add a new Tag
                    const newTag = new TagModel({
                        _id: new connectedDB.Types.ObjectId(),
                        str: questionTags[i],
                        enabled: true
                    });
                    chatTags.push(newTag);
                }
            }
        }

        chat.Questions = chatQuestions;
        chat.Tags      = chatTags;

        save();

        // assert this type (that's assignable to Ichat), because those fields are necessarily going to be nonempty
        return chat as Ichat_withNonEmptyFields<'Questions' | 'lastqid'>;
    });

}

