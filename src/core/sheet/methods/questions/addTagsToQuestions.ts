import queryChat from "../functions/queryChat";
import { validateTags } from "../functions/hashtag";
import TagModel from "../../models/TagModel";
import mongoose, { DBconnection } from "../../mongoose";



type result =
{
    hasChanges: false,
    reason: 'no such Tags' |
            'no questions with such qids' |
            'the questions already have the Tags'
}
|
{
    hasChanges: true,
    qidsAffected: number[],
    qidsUnaffected: number[]
};

/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param Tags list of Tag strings (without hash) to add. Will be validated.
 * @param qids list of `question` document `qid`s to add Tags to. Will be validated.
 * @return {Promise<result>}
 *
 */
export default async function addTagsToQuestions(chatId: number, args: { Tags: string[], qids: number[] | 'all'})
    : Promise<result>
{

    const {Tags, qids} = args;

    const connectedDB = await DBconnection;

    return queryChat(chatId, { "Questions": true, "Tags": true }, 
    (chat, save): result => {

        const chatQuestions = Array.isArray(chat.Questions)? chat.Questions: [];
        const chatTags      = Array.isArray(chat.Tags)     ? chat.Tags     : [];

        const validatedTags = validateTags(Tags);
        if (validatedTags.length === 0){
            return {
                hasChanges: false,
                reason: 'no such Tags'
            };
        };


        const queriedQuestions =
            qids === 'all' ?
                chatQuestions :
                chatQuestions.filter(cq => qids.includes(cq.qid));

        if (queriedQuestions.length === 0){
            return {
                hasChanges: false,
                reason: 'no questions with such qids'
            };
        };


        let atLeastOne = false;

        const qidsAffected: number[] = [];
        
        // for each of the specified questions
        queriedQuestions.forEach((q)=>{
            // for each of the specified Tags
            for (let i = 0; i < validatedTags.length; i++) {
                // if a questions doesn't have a tag
                if (!q.Tags.includes(validatedTags[i])){
                    atLeastOne = true;

                    // add to the list of affected questions, if not already
                    qidsAffected.indexOf(q.qid) === -1 ? qidsAffected.push(q.qid) : '';

                    // add a new tag to a question
                    q.Tags.push(validatedTags[i]);

                    // add a new tag to the Tags list, if not present already
                    if (!chatTags.some(T => T.str === validatedTags[i] )){
                        const newTag = new TagModel({
                            _id: new connectedDB.Types.ObjectId(),
                            str: validatedTags[i],
                            enabled: true
                        });
                        chatTags.push(newTag);
                    };

                };
            };            
        });

        if (!atLeastOne){
            return {
                hasChanges: false,
                reason: 'the questions already have the Tags'
            };
        };


        const qidsUnaffected = queriedQuestions.map(q=>q.qid).filter(x => !qidsAffected.includes(x));


        chat.Questions = chatQuestions;
        chat.Tags      = chatTags;

        save();

        return {
            hasChanges: true,
            qidsAffected: qidsAffected,
            qidsUnaffected: qidsUnaffected
        };

    }); // return queryChat

};
