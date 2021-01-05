import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { turnQuestionsOnOff_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import formList from "../../textForming/formList";
import youDontHaveQuestions from "../../textForming/youDontHaveQuestions";


export default async function turnQuestionsOnOff_display(msg: IIMessage, data: turnQuestionsOnOff_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    
    const chatId = msg.chat.id;

    const messageParts: string[] = [];

    const status = data.request.turn === 'on' ? true : false;

    if (data.action === 'execute sheet method'){
        if (data.response.hasChanges){
            if (data.request.questions === 'all'){
                messageParts.push(either([
                    `${status?'Enbaled':'Disabled'} all your questions`,
                    `${status?'Enbaled':'Disabled'} all questions in ${either(['our', 'your'])} list`,
                ]));
            } else {
                if (data.response.qidsAffected.length === 1){
                    messageParts.push(either([
                        `${status?'Enbaled':'Disabled'} question #${data.response.qidsAffected[0]}`,
                    ]));
                } else if (data.response.qidsAffected.length > 1) {
                    messageParts.push(either([
                        `${status?'Enbaled':'Disabled'} the following questions:\n` +
                        `<i>${formList(data.response.qidsAffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
                if (data.response.qidsUnaffected.length === 1){
                    messageParts.push(either([
                        `Question #${data.response.qidsUnaffected[0]} is already ${status?'enbaled':'disabled'}`,
                    ]));
                } else if (data.response.qidsUnaffected.length > 1) {
                    messageParts.push(either([
                        `The following questions are already ${status?'enbaled':'disabled'}:\n` +
                        `<i>${formList(data.response.qidsUnaffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
            }

        } else { // if there were no changes after an execution

            if (data.response.reason === 'no questions with such qids'){
                if (data.request.questions === 'all'){
                    messageParts.push(youDontHaveQuestions());

                } else { // if requested questions by qid numbers
                    if (data.request.questions.length === 1) {
                        messageParts.push(either([
                            `Sorry, there's no question #${data.request.questions[0]}`,
                            `Sorry, there's no question #${data.request.questions[0]} in out list`,
                            `Sorry, we don't have a question #${data.request.questions[0]}`,
                            `Sorry, I don't have a question #${data.request.questions[0]}`,
                        ]));
                    } else if (data.request.questions.length > 1) {
                        messageParts.push(either([
                            `You've asked me to ${status?'enable':'disable'} questions <i>${formList(data.request.questions,{prefix:'#',comma:',',conj:'and'})}</i>\n`
                            + 
                            `Sorry, there are no such questions`,
                        ]));
                    }
                }

            } else if (data.response.reason === 'the questions already have the specified status') {

                if (data.request.questions === 'all'){
                    if (data.qids.length === 1) {
                        messageParts.push(either([
                            `Your only question, <i>question #${data.qids[0]}</i>, ${either(['is already','has already been'])} ${status?'enabled':'disabled'}`,
                        ]));
                    } else if (data.qids.length > 1) {
                        messageParts.push(either([
                            `All your questions are already ${status?'enabled':'disabled'}`,
                        ]));
                    }
                } else { // if requested questions by qid numbers
                    if (data.qids.length === 1) {
                        messageParts.push(either([
                            `Question <i>#${data.qids[0]}</i> is already ${status?'enabled':'disabled'}`,
                        ]));
                    } else if (data.qids.length > 1) {
                        messageParts.push(either([
                            `Questions <i>${formList(data.qids, { prefix: '#', conj: '&' })}</i> are already ${status?'enabled':'disabled'}`,
                        ]));
                    }
                }
            }
        }

    } else if (data.action === 'ask confirmation') {
        // are you sure?

        if (data.request.questions === 'all'){

            messageParts.push(either([
                `Are you sure you want to ${status?'enable':'disable'} all ${either(['your','our'])} questions?`,
                `Are you sure you want to ${status?'enable':'disable'} all questions in your list?`,
            ]));

        } else { // if requested questions by qid numbers
            
            messageParts.push(either([
                `Are you sure you want to ${status?'enable':'disable'} the following questions: <i>${formList(data.qids)}</i>?`,
                `Are you sure you want to ${status?'enable':'disable'} questions <i>${formList(data.qids)}</i>?`,
            ]));

        }


    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}