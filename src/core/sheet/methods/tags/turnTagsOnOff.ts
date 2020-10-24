import queryChat from "../functions/queryChat";
import { validateTags } from "../functions/hashtag";

type result =
{
    hasChanges: false,
    reason: 'no such Tags' |
            'the Tags already have the specified status'
}
|
{
    hasChanges: true,
    tagsAffected: string[],
    tagsUnaffected: string[]
};


/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param Tags list of `tags` to switch `enabled` status. Will be validated.
 * @param status whether to turn on or off questions
 * @return {Promise<result>}
 *
 */
export default async function turnTagsOnOff(chatId: number, Tags: string[] | 'all', status: 'on' | 'off')
{

    return queryChat(chatId, { "Tags": true },
    (chat, save): result =>{

        const applyStatus = status === 'on' ? true : false;
        
        const chatTags = Array.isArray(chat.Tags) ? chat.Tags : [];


        const validatedTags =
            Tags === 'all' ?
                chatTags.map(T => T.str) :
                validateTags(Tags);

        if (validatedTags.length === 0){
            return {
                hasChanges: false,
                reason: 'no such Tags'
            };
        };


        // get Tag objects instead of strings
        const queriedTags = chatTags.filter(T => validatedTags.includes(T.str));

        if (queriedTags.length === 0) {
            // should not happen
            return {
                hasChanges: false,
                reason: 'no such Tags'
            };
        };


        let atLeastOne = false;

        const tagsAffected: string[] = [];


        // for each of the specified and validated Tags
        queriedTags.forEach( T => {

            if (T.enabled !== applyStatus){
                atLeastOne = true;

                // add to the list of affected tags, if not already
                tagsAffected.indexOf(T.str) === -1 ? tagsAffected.push(T.str) : '';
                
                T.enabled = applyStatus;

            };
            
        });


        if (!atLeastOne){
            return {
                hasChanges: false,
                reason: 'the Tags already have the specified status'
            };
        };
        

        const tagsUnaffected = validatedTags.filter(x => !tagsAffected.includes(x));


        chat.Tags = chatTags;

        save();

        return {
            hasChanges: true,
            tagsAffected: tagsAffected,
            tagsUnaffected: tagsUnaffected
        };





    }); //return queryChat

};

