import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { listTags_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import youDontHaveTags from "../../textForming/youDontHaveTags";
import formList from "../../textForming/formList";


export default async function listTags_display(msg: IIMessage, data: listTags_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    console.log(`listTags_display()`);

    const chatId = msg.chat.id;

    const messageParts: string[] = [];


    if (data.request === 'all'){

        if (data.response && data.response.length > 0){
            messageParts.push(
                either([
                    `Here are `,
                    `Showing you `,
                    `Here is the list of `,
                    `Showing you the list of `,
                ]) + either([
                    `all the tags you have:\n`,
                    `all the tags I have in your questions list:\n`,
                    `all your tags:\n`,
                ])
                +
                `\n<i>${formList(data.response.map(T => T.str), { prefix: '  #', comma: '\n', conj: '', noSpaces: true, })}\n`+
                `\n(total ${data.response.length} tags)</i>`
            );

 
        } else { // no tags
            messageParts.push(youDontHaveTags());
        }


    } else { // if request is tagsQuery

        let here_is_are = '';
        let a_all_tags = '';
        let en_dis_abled = '';
        let ofQuestionsWithQids = '';
        let tagsStrParts = '';

        const queriedOnlyByQids = data.request.enabled === undefined && data.request.tagsStrParts === undefined && !!data.request.qids && data.request.qids.length > 0;


        /////////////////////////////////////////
        ////    Beginning of the sentence    ////
        /////////////////////////////////////////
        if (!data.response || data.response.length === 0) {
            here_is_are = either([
                `You've asked for `,
            ]);
        } else if (data.response.length === 1) {
            here_is_are = either([
                `Showing you `,
                `Here is `,
            ]);
        } else if (data.response.length >= 2) {
            here_is_are = either([
                `Showing you `,
                `Here are `,
                `${either(['Here is','Showing you'])} the list of `,
            ]);
        }


        //////////////////////////////////////////
        ////             By status            ////
        //////////////////////////////////////////
        // if requested by status
        if (data.request.enabled !== undefined){
            if (data.request.enabled){ // requested enabled tags
                en_dis_abled = either(['enabled','enabled','enabled','activated']) + ' ';
            } else { // requested disabled tags
                en_dis_abled = either(['disabled','disabled','turned off','deactivated']) + ' ';
            }
        }

        if (!data.response || data.response.length === 0) {
            a_all_tags = either([
                `any ${en_dis_abled}tags `,
            ]);
        } else if (data.response.length === 1) {
            a_all_tags = either([
                `a ${en_dis_abled}tag `,
            ]);
        } else {
            a_all_tags = either([
                `all ${en_dis_abled}tags `,
            ]);
        }


        //////////////////////////////////////////
        ////          by tagsStrParts         ////
        //////////////////////////////////////////
        // TODO: implement listTags by tagsStrParts
        if (data.request.tagsStrParts) {
            tagsStrParts = '';
        }


        //////////////////////////////////////////
        ////              by qids             ////
        //////////////////////////////////////////
        if (!data.request.qids || data.request.qids.length === 0) {
            ofQuestionsWithQids = '';
        } else if (data.request.qids.length === 1) {
            ofQuestionsWithQids = `of question ${data.request.qids[0]} `;
        } else if (data.request.qids.length > 1) {
            ofQuestionsWithQids = `of questions <i>${formList(data.request.qids, {prefix:'#',conj:'or'})}</i> `;
        }



        //////////////////////////////////////////
        ////     form and send a sentence     ////
        //////////////////////////////////////////
        let sentence = `${here_is_are}${a_all_tags}${ofQuestionsWithQids}`;
        
        // if no such tags
        if (!data.response || data.response.length === 0){
            // if queried by qids
            if (data.request.qids && data.request.qids.length > 0){

                const en_dis_abled_any = en_dis_abled ? en_dis_abled : 'any ';

                if (data.request.qids.length === 1) {
                    sentence += '\n' + either([
                        `Question #${data.request.qids[0]} doesn't have ${en_dis_abled_any}tags`,
                    ]);
                } else if (data.request.qids.length <= 3) {
                    sentence += '\n' + either([
                        `Questions <i>${formList(data.request.qids,{prefix:'#',conj:'&'})}</i> don't have ${en_dis_abled_any}tags`,
                    ]);
                } else if (data.request.qids.length > 3) {
                    sentence += '\n' + either([
                        `These questions don't have ${en_dis_abled_any} tags`,
                    ]);
                }

            } else { // not queried by qids
                if (data.request.enabled !== undefined){ // queried by status and not by qids
                    sentence += '\n' + either([
                        `There are no ${en_dis_abled}tags`,
                        `${either([`There are no`, `We don't have`])} ${either([en_dis_abled,'such '])}tags on ${either(['your', 'the'])} questions list`,
                        `There are no such tags`,
                        `There are no such tags`,
                    ]);
                } else { // querie not by status and not by qids
                    sentence += '\n' + either([
                        `${either([`There are no`, `We don't have`])} such tags on ${either(['your', 'the'])} questions list`,
                        `There are no such tags`,
                        `There are no such tags`,
                    ]);
                }
            }

        } else { // if requested tags exist
            sentence += `:\n\n<i>${formList(data.response.map(T => T.str), {prefix: '  #', comma: '\n', noSpaces: true})}\n` + 
            `\n(total ${data.response.length} tags)</i>`;
        }

        messageParts.push(sentence);

    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
