import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { deleteQuestions_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import formList from "../../textForming/formList";
import { arraysAreEqualSets } from "../../../reusable/compareArrays";


export default async function deleteQuestions_display(msg: IIMessage, data: deleteQuestions_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    
    const chatId = msg.chat.id;

    const messageParts: string[] = [];


    const qids = data.qids;
    const qids_len = qids.length;


    if (data.request === 'all'){

        if (data.action === 'noop (no such questions)'){
            messageParts.push(either([
                `You don't have any questions at all!`,
                `There are no questions in your list`,
                `There are 0 questions in your list`,
            ]));

        } else if (data.action === 'confirm deleting questions'){

            if (qids_len === 1){
                messageParts.push(either([
                    `Are you sure you want to ${either(['delete','remove'])} your only question #${qids[0]}?`,
                    `Are you sure you want to ${either(['delete','remove'])} the only question in your list (#${qids[0]})?`,
                ]));

            } else if (qids_len === 2){
                messageParts.push(either([
                    `Are you sure you want to ${either(['delete','remove'])} both of all your questions? (#${qids[0]} and #${qids[1]}?)`,
                ]));
                
            } else if (qids_len < 20){
                messageParts.push(either([
                    `Are you sure you want to ${either(['delete','remove'])} all ${either(['the','your',`${qids_len}`])} questions?`,
                    `Are you sure you want to ${either(['delete','remove'])} all ${either(['the',`${qids_len}`])} questions from your list?`,
                    `Are you sure you want to ${either(['delete','remove'])} all ${either(['your',`${qids_len}`])} questions from the list?`,
                ]) + '\n' + either([
                    `<i>${formList(qids, {prefix: '#', comma: ',', conj: 'and'})}</i>`,
                ]));

            } else if (qids_len >= 20){
                messageParts.push(either([
                    `Are you serious about ${either(['deleting','removing'])} all ${either(['the','your',`${qids_len}`])} questions?`,
                    `Really? Are you sure you want to ${either(['delete','remove'])} all ${either(['the',`${qids_len}`])} questions from your list?`,
                    `Are you really sure you want to ${either(['delete','remove'])} all ${either(['your',`${qids_len}`])} questions from the list?`,
                    `You are seriously asking me to ${either(['delete','remove'])} all ${either(['your',`${qids_len}`])} questions from the list? Are you sure?`,
                ]) + '\n' + either([
                    `<i>${formList(qids, {prefix: '#', comma: ',', conj: 'and'})}</i>`,
                ]));
            }

        }


    } else {
        // data.request is `questionsQuery`

        let youAreAskingMeToDelete = '';
        let oneRandomOrAll = '';
        let en_dis_abled = '';
        let with_qids = '';
        let tagged_untagged = '';
        const queriedOnlyByQids = !data.request.Tags &&
            data.request.enabled === undefined &&
            data.request.havingTagsEnabled === undefined &&
            !data.request.questionTextParts &&
            !data.request.random &&
            data.request.qids &&
            arraysAreEqualSets(data.request.qids, data.qids);
        const matchedOnlyOneQuestion = data.qids.length === 1;
        const queriedOnlyOneQuestion = data.request.random || data.request.qids?.length === 1;


        youAreAskingMeToDelete = either([
            `${either(['You\'ve asked','You are asking'])}${either([' me ',' '])}to ${either(['delete','remove'])} `,
        ]);


        //////////////////////////////////////////
        ////        enabled or disabled       ////
        //////////////////////////////////////////
        // TODO: implement deleteQuestions by havingTagsEnabled
        if (data.request.enabled === true) {
            en_dis_abled = either(['enabled ','enabled ','enabled ','activated ']);
        } else if (data.request.enabled === false) {
            en_dis_abled = either(['disabled ','disabled ','turned off ','deactivated ']);
        } else {
            en_dis_abled = '';
        }


        //////////////////////////////////////////
        //// requested multiple or any random ////
        //////////////////////////////////////////
        if (data.request.random === true) {
            oneRandomOrAll = either([
                `a random ${en_dis_abled}question `,
                `any ${en_dis_abled}question `,
            ]);
        } else {
            if (queriedOnlyByQids){
                oneRandomOrAll = either([
                    `${either(['the ', ''])}question${queriedOnlyOneQuestion ? '' : 's'} `,
                ]);
            } else {
                oneRandomOrAll = either([
                    `all ${either(['the ', ''])}${en_dis_abled}questions `,
                    `all ${en_dis_abled}questions `,
                ]);
            }
        }


        //////////////////////////////////////////
        ////          if tags matter          ////
        //////////////////////////////////////////
        if (data.request.Tags === 'no') {
            tagged_untagged = either(['with no tags ', 'without any tags ', 'untagged ']);

        } else if (data.request.Tags === 'any') {
            tagged_untagged = either(['tagged with any tag ', 'tagged ', 'with any tag ']);

        } else if (Array.isArray(data.request.Tags) && data.request.Tags.length) {
            tagged_untagged = either(['tagged with ', 'with tags ']);
            tagged_untagged += formList(data.request.Tags, { prefix: '#', comma: ',', conj: 'or' }) + ' ';
        }


        //////////////////////////////////////////
        ////         if qids specified        ////
        //////////////////////////////////////////
        if (Array.isArray(data.request.qids) && data.request.qids.length) {
            if (data.request.qids.length === 1) {
                if (queriedOnlyByQids){
                    with_qids = `number ${data.request.qids[0]}`;
                } else {
                    with_qids = `with question number ${data.request.qids[0]}`;
                }
            } else {
                with_qids = 'with question numbers ';
                with_qids += formList(data.request.qids, {prefix: '#', comma: ',', conj: ''}) + ' ';
            }
        }


        //////////////////////////////////////////
        ////       by questionTextParts       ////
        //////////////////////////////////////////
        // TODO: implement listQuestions by questionTextParts


        //////////////////////////////////////////
        ////     form and send a sentence     ////
        //////////////////////////////////////////
        let sentence = `${youAreAskingMeToDelete}${oneRandomOrAll}${tagged_untagged}${with_qids}`;

        if (data.action === 'noop (no such questions)') {
            sentence += '\n' + either([
                `${either([`There are no`,`We don't have`])} such questions on ${either(['your','the'])} list`,
                `There are no such questions`,
                `There are no such questions`,
            ]);

        } else if (data.action === 'confirm deleting questions') {

            // if queried only by qids, and all requested qids exist, no need to write them again.
            if (queriedOnlyByQids){
                    sentence += '\n' + 'Are you sure?';

            } else {
                sentence += '\n' + either([
                    `Are you sure you want to ${either(['delete','remove'])} `,
                ]);
                if (matchedOnlyOneQuestion) {
                    sentence += `the following question: <i>${data.qids[0]}</i>`;
                } else {
                    sentence += `the ${data.qids.length} following questions:`;
                    sentence += `\n<i>${formList(data.qids, {prefix: '#', comma: ',', conj: 'and'})}</i>\n`;
                    sentence += '?';
                }

            }

        }

        messageParts.push(`${sentence}`);

    }


    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
