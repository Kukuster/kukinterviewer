import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { removeTagsFromQuestions_execute_return } from "./execute";
import formList from "../../textForming/formList";
import either from "../../../reusable/randomElement";
import youDontHaveQuestions from "../../textForming/youDontHaveQuestions";


export default async function removeTagsFromQuestions_display(msg: IIMessage, data: removeTagsFromQuestions_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    console.log('removeTagsFromQuestions_display');
    
    const chatId = msg.chat.id;
    
    const messageParts: string[] = [];

    console.log({ data });

    const Tags = data.request.Tags;
    const Tags_humanList = Tags==='all' ? Tags : '<i>'+formList(Tags,{prefix:'#',conj:'&'})+'</i>';
    const Tags_humanList_sentencePart = 
        Tags === 'all' ?
            'all tags' :
            Tags.length === 1 ?
                `tag ${Tags_humanList}`:
                Tags.length < 4 ?
                    `tags ${Tags_humanList}`:
                    Tags.length < 8 ?
                        `the following tags:\n${Tags_humanList}\n`:
                        `the following tags:\n<i>${formList(Tags,{prefix:'  #',conj:'',comma:'\n',noSpaces:true})}</i>\n`;

    const alreadyDoesntHaveTheTags =
        Tags==='all' ?
            either(['is already not tagged','already doesn\'t have any tags','doesn\'t have any tags','has no tags already']) :
            either(['is already not tagged with','already doesn\'t have','already has no'])+' '+Tags_humanList_sentencePart;

    const alreadyDontHaveTheTags =
        Tags==='all' ?
            either(['are already not tagged','already don\'t have any tags','don\'t have any tags','have no tags already']) :
            either(['are already not tagged with','already don\'t have','already have no'])+' '+Tags_humanList_sentencePart;

    const alreadyDoesntHaveTheSpecifiedTags =
        Tags==='all' ?
            either(['is already not tagged','already doesn\'t have any tags','doesn\'t have any tags','has no tags already']) :
            either(['is already not tagged with','already doesn\'t have','already has no'])+' the specified tags';
    
    const alreadyDontHaveTheSpecifiedTags =
        Tags==='all' ?
            either(['are already not tagged','already don\'t have any tags','don\'t have any tags','have no tags already']) :
            either(['are already not tagged with','already don\'t have'])+' the specified tags';


    if (data.action === 'execute sheet method'){
        if (data.response.hasChanges){
            if (data.request.qids === 'all'){
                messageParts.push(either([
                    `Removed ${Tags_humanList_sentencePart} from all your questions`,
                    `Removed ${Tags_humanList_sentencePart} from all questions in ${either(['our', 'your'])} list`,
                ]));
            } else {
                if (data.response.qidsAffected.length === 1) {
                    messageParts.push(either([
                        `Removed ${Tags_humanList_sentencePart} from the question #${data.response.qidsAffected[0]}`,
                    ]));
                } else if (data.response.qidsAffected.length > 1) {
                    messageParts.push(either([
                        `Removed ${Tags_humanList_sentencePart} from the following questions:\n` +
                        `<i>${formList(data.response.qidsAffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
                if (data.response.qidsUnaffected.length === 1) {
                    messageParts.push(either([
                        `Question #${data.response.qidsUnaffected[0]} ${Tags==='all' ? alreadyDoesntHaveTheTags : alreadyDoesntHaveTheSpecifiedTags}`,
                    ]));
                } else if (data.response.qidsUnaffected.length > 1) {
                    messageParts.push(either([
                        `The following questions ${Tags==='all' ? alreadyDontHaveTheTags : alreadyDontHaveTheSpecifiedTags}:\n` +
                        `<i>${formList(data.response.qidsUnaffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
            }

        } else { // if there were no changes after an execution

            if (data.response.reason === 'no questions with such qids') {
                if (data.request.qids === 'all') {
                    messageParts.push(youDontHaveQuestions());

                } else { // if requested questions by qid numbers 
                    if (data.request.qids.length === 1) {
                        messageParts.push(either([
                            `Sorry, there's no question #${data.request.qids[0]}`,
                            `Sorry, there's no question #${data.request.qids[0]} in out list`,
                            `Sorry, we don't have a question #${data.request.qids[0]}`,
                            `Sorry, I don't have a question #${data.request.qids[0]}`,
                        ]));
                    } else if (data.request.qids.length > 1) {
                        messageParts.push(either([
                            `You've asked me to remove ${Tags_humanList_sentencePart} from the questions <i>${formList(data.request.qids, { prefix: '#', comma: ',', conj: 'and' })}</i>\n`
                            +
                            `Sorry, there are no such questions`,
                        ]));
                    }
                }

            } else if (data.response.reason === "the questions already don't have the Tags") {

                if (data.request.qids === 'all'){
                    if (data.queriedQuestions.length === 1) {
                        messageParts.push(either([
                            `Your only question, <i>question #${data.queriedQuestions[0].qid}</i>, ${alreadyDoesntHaveTheTags}`,
                        ]));
                    } else if (data.queriedQuestions.length > 1) {
                        messageParts.push(either([
                            `All your questions ${alreadyDontHaveTheTags}`,
                        ]));
                    }
                } else { // if requested questions by qid numbers
                    if (data.queriedQuestions.length === 1) {
                        messageParts.push(either([
                            `Question <i>#${data.queriedQuestions[0].qid}</i> ${alreadyDoesntHaveTheTags}`,
                        ]));
                    } else if (data.queriedQuestions.length > 1) {
                        messageParts.push(either([
                            `Questions <i>${formList(data.queriedQuestions.map(Q => Q.qid), { prefix: '#', conj: '&' })}</i> ${alreadyDontHaveTheTags}`,
                        ]));
                    }
                }
            }
        }

    } else if (data.action === 'ask confirmation') {
        // are you sure?

        if (data.request.qids === 'all'){

            messageParts.push(either([
                `Are you sure you want to remove ${Tags_humanList_sentencePart} from all ${either(['your','our'])} questions?`,
                `Are you sure you want to remove ${Tags_humanList_sentencePart} from all questions in your list?`,
            ]));

        } else { // if requested questions by qid numbers

            messageParts.push(either([
                `Are you sure you want to remove ${Tags_humanList_sentencePart} from the following questions: <i>${formList(data.queriedQuestions.map(Q=>Q.qid))}</i>?`,
                `Are you sure you want to remove ${Tags_humanList_sentencePart} from questions <i>${formList(data.queriedQuestions.map(Q=>Q.qid))}</i>?`,
            ]));

        }


    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}