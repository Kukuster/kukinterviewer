import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { listQuestions_execute_return } from "./execute";
import formQuestionOutput from "../../textForming/formQuestionOutput";
import either from "../../../reusable/randomElement";
import formList from "../../textForming/formList";
import youDontHaveQuestions from "../../textForming/youDontHaveQuestions";


export default async function listQuestions_display(msg: IIMessage, data: listQuestions_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    
    const chatId = msg.chat.id;

    const questions = data.response;
    const questions_len = questions.length;

    const request = data.request;
    

    const messageParts: string[] = [];


    if (request === "all"){
        if (questions_len === 0){

            messageParts.push(youDontHaveQuestions());

            return sendMessageSafely(chatId, messageParts, {
                parse_mode: 'HTML',
            });

        } else {

            messageParts.push(
                either([
                    `Here are `,
                    `Showing you `,
                    `Here is the list of `,
                    `Showing you the list of `,
                ]) + either([
                    `all the questions you have:\n`,
                    `all the questions I have in your list:\n`,
                    `all your questions:\n`,
                ]) + `<i>(total ${questions_len} questions)</i>`
            );

            for (let i = 0; i < questions_len; i++){
                messageParts.push(`${await formQuestionOutput(chatId, questions[i])}`);
            }

        }

    } else { // request is questionsQuery

        let here_is_are = '';
        let oneRandomOrAll = '';
        let en_dis_abled = '';
        let with_qids = '';
        let tagged_untagged = '';
        let questionTextParts = '';


        /////////////////////////////////////////
        ////    Beginning of the sentence    ////
        /////////////////////////////////////////
        if (questions_len === 0) {
            here_is_are = either([
                `You've asked for `,
            ]);
        } else if (questions_len === 1) {
            here_is_are = either([
                `Showing you `,
                `Here is `,
            ]);
        } else if (questions_len >= 2) {
            here_is_are = either([
                `Showing you `,
                `Here are `,
                `${either(['Here is','Showing you'])} the list of `,
            ]);
        }


        //////////////////////////////////////////
        ////        enabled or disabled       ////
        //////////////////////////////////////////
        // TODO: implement listQuestions by havingTagsEnabled
        if (request.enabled === true) {
            en_dis_abled = either(['enabled ','enabled ','enabled ','activated ']);
        } else if (request.enabled === false) {
            en_dis_abled = either(['disabled ','disabled ','turned off ','deactivated ']);
        } else {
            en_dis_abled = '';
        }


        //////////////////////////////////////////
        //// requested multiple or any random ////
        //////////////////////////////////////////
        if (request.random === true) {
            oneRandomOrAll = either([
                `a random ${en_dis_abled}question `,
                `any ${en_dis_abled}question `,
            ]);
        } else {
            if (questions_len === 0) {
                oneRandomOrAll = either([
                    `any ${en_dis_abled}questions `,
                ]);
            } else if (questions_len === 1) {
                oneRandomOrAll = either([
                    `a ${en_dis_abled}question `,
                ]);
            } else {
                oneRandomOrAll = either([
                    `all the ${en_dis_abled}questions `,
                    `all ${en_dis_abled}questions `,
                ]);
            }
        }


        //////////////////////////////////////////
        ////          if tags matter          ////
        //////////////////////////////////////////
        if (request.Tags === 'no') {
            tagged_untagged = either(['with no tags ', 'without any tags ', 'untagged ']);

        } else if (request.Tags === 'any') {
            tagged_untagged = either(['tagged with any tag ', 'tagged ', 'with any tag ']);

        } else if (Array.isArray(request.Tags) && request.Tags.length) {
            tagged_untagged = either(['tagged with ', 'with tags ']);
            tagged_untagged += formList(request.Tags, {prefix: '#', comma: ',', conj: 'or'}) + ' ';
        }


        //////////////////////////////////////////
        ////         if qids specified        ////
        //////////////////////////////////////////
        if (Array.isArray(request.qids) && request.qids.length) {
            if (request.qids.length === 1) {
                with_qids = `with question number ${request.qids[0]}`;
            } else {
                with_qids = 'with question numbers ';
                with_qids += formList(request.qids, {prefix: '#', comma: ',', conj: ''}) + ' ';
            }
        }


        //////////////////////////////////////////
        ////       by questionTextParts       ////
        //////////////////////////////////////////
        // TODO: implement listQuestions by questionTextParts
        if (request.questionTextParts) {
            questionTextParts = '';
        }


        //////////////////////////////////////////
        //// requested multiple or any random ////
        //////////////////////////////////////////
        if (tagged_untagged || with_qids || questionTextParts) {
            if (request.random === true) {
                oneRandomOrAll += either([
                    `from those which are `,
                    `from those that are `,
                ]);
            } else {
                if (questions_len === 1){
                    oneRandomOrAll += either([
                        `that is `,
                        `that's `,
                        `which is `,
                    ]);
                } else {
                    oneRandomOrAll += either([
                        `that are `,
                        `which are `,
                    ]);
                }
            }
        }


        //////////////////////////////////////////
        ////     form and send a sentence     ////
        //////////////////////////////////////////
        let sentence = `${here_is_are}${oneRandomOrAll}${tagged_untagged}${with_qids}`;

        if (questions_len === 0){
            sentence += '\n' + either([
                `${either([`There are no`,`We don't have`])} such questions on ${either(['your','the'])} list`,
                `There are no such questions`,
                `There are no such questions`,
            ]);
        } else {
            sentence += `:\n<i>${formList(questions.map(Q => Q.qid), {prefix: '#', comma: ',', conj: 'and'})}\n` +
            `(total ${questions_len} questions)</i>`;
        }

        messageParts.push(`${sentence}`);

        messageParts.push(...(await Promise.all(
            questions.map(Q => formQuestionOutput(chatId, Q)),
        )));

    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
