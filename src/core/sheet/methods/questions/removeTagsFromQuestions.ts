import queryChat from "../functions/queryChat";
import { validateTags } from "../functions/hashtag";



export type removeTagsFromQuestions_result =
{
    hasChanges: false,
    reason: 'all provided Tags are invalid' |
            'no questions with such qids' |
            'the questions already don\'t have the Tags'
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
 * @param Tags list of Tag strings (without hash) to remove. Will be validated.
 * @param qids list of `question` document `qid`s to remove Tags from. Will be validated.
 * @return {Promise<removeTagsFromQuestions_result>}
 *
 */
export default async function removeTagsFromQuestions(chatId: number, args: {Tags: string[] | 'all', qids: number[] | 'all', correctQuestionText: boolean})
    : Promise<removeTagsFromQuestions_result>
{

    const {Tags, qids, correctQuestionText} = args;

    return queryChat(chatId, { "Questions": true, "Tags": true }, 
    (chat, save): removeTagsFromQuestions_result => {

        const chatQuestions = Array.isArray(chat.Questions)? chat.Questions: [];
        const chatTags      = Array.isArray(chat.Tags)     ? chat.Tags     : [];

        const validatedTags =
            Tags === 'all' ?
                chatTags.map(T => T.str) :
                validateTags(Tags);

        if (validatedTags.length === 0){
            return {
                hasChanges: false,
                reason: 'all provided Tags are invalid'
            };
        }


        const queriedQuestions =
            qids === 'all' ?
                chatQuestions :
                chatQuestions.filter(cq => qids.includes(cq.qid));

        if (queriedQuestions.length === 0){
            return {
                hasChanges: false,
                reason: 'no questions with such qids'
            };
        }


        let atLeastOne = false;

        const qidsAffected: number[] = [];
        
        // for each of the specified questions
        queriedQuestions.forEach((q)=>{
            // for each of the specified Tags
            for (let i = 0; i < validatedTags.length; i++) {
                // if a questions has a tag
                const tag_i = q.Tags.indexOf(validatedTags[i]);

                if (tag_i >= 0){
                    atLeastOne = true;

                    // add to the list of affected questions, if not already
                    qidsAffected.indexOf(q.qid) === -1 ? qidsAffected.push(q.qid) : '';

                    // remove a tag from a question
                    q.Tags.splice(tag_i, 1);

                    // if choosen so, remove hashtag sign from tags inside the questionText as well
                    if (correctQuestionText){
                        const qInChat = chatQuestions.find(chatQ => q.qid === chatQ.qid)!;
                        qInChat.questionText = qInChat.questionText.replace('#'+validatedTags[i], validatedTags[i]);
                    }

                }
            }
        });

        if (!atLeastOne){
            return {
                hasChanges: false,
                reason: 'the questions already don\'t have the Tags'
            };
        }


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

}
