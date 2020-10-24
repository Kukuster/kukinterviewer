'use strict';
import { Ichat } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";


export type tagsQuery = {
    qids?:             number[],
    tagStrParts?:      string[],
    enabled?:          boolean
};

/**
 * 
 * @param query an argument to `getTags` function
 * @returns whether _query_ is a `tagsQuery` type and has at least one property
 */
function isProperTagsQuery(query: number[] | 'all' | tagsQuery): query is tagsQuery {
    return (query as tagsQuery).qids!              !== undefined ||
           (query as tagsQuery).tagStrParts!       !== undefined ||
           (query as tagsQuery).enabled!           !== undefined;
};

/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param query 'all' for all tags, 
 * @returns 
 *
 */
export default async function getTags(chatId: number, query:  'all' | tagsQuery)
    //: Promise<Ichat['Tags']>
{

    const select: { "Tags": true, "Questions"?: true } = { "Tags": true };
    if (isProperTagsQuery(query) && query.qids){
        select["Questions"] = true;
    };

    return queryChat(chatId, select,
    (chat): Ichat['Tags'] =>{

        const chatTags = Array.isArray(chat.Tags) ? chat.Tags : [];
        

        console.log(query);
        if (query && isProperTagsQuery(query)){
            
            let filteringTags = chatTags;
            
            // leave only those that match `enabled` field (if provided)
            if (query.enabled !== undefined){
                filteringTags = filteringTags.filter(T =>
                    query.enabled === undefined || !!T.enabled === !!query.enabled
                );
            };
            
            // leave only those that contain any of provided strings (if provided)
            if (query.tagStrParts !== undefined && query.tagStrParts.length > 0) {
                let tagStrRegexps: RegExp[] = [];
                query.tagStrParts.forEach(s => {
                    s ?
                        tagStrRegexps.push(new RegExp(s, 'i'))
                        : undefined;
                });

                if (tagStrRegexps.length > 0) {
                    filteringTags = filteringTags.filter(q =>
                        tagStrRegexps.some(r => q.str.match(r))
                    );
                };
            };


            // leave only those tags that questions with specified qids have
            if (query.qids !== undefined && query.qids.length > 0){
                const chatQuestions = Array.isArray(chat.Questions) ? chat.Questions : [];

                const specifiedQidsTags: string[][] = [];
                chatQuestions.forEach(q=>{
                    if (query.qids?.includes(q.qid)){
                        specifiedQidsTags[q.qid] = q.Tags;
                    };
                });

                filteringTags = filteringTags.filter(T => 
                    specifiedQidsTags.find((Tags) => {
                        return Tags ? Tags.includes(T.str) : undefined;
                    })
                );
            };

            return filteringTags;
            
        } // if is questionsQuery

        // if is 'all' or unset
        else if (query === 'all' || !query) {
            return chatTags;
        }

        else {
            return chatTags;
        };        


    });


};
