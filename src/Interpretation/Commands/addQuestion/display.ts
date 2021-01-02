import { IIMessage } from "../../../core/Command/Command";
import { maybeTelegramBotMessage, TelegramMessageLengthSoftLimit } from "../../../botlib";
import { addQuestion_execute_return } from "./execute";
import randomElement from "../../../reusable/randomElement";
import formQuestionOutput from "../../textForming/formQuestionOutput";
import { sendMessageSafely } from "../../../bot";


export default async function addQuestion_display(msg: IIMessage, data: addQuestion_execute_return | null)
    : Promise<maybeTelegramBotMessage[] | null>
{   
    const chatId = msg.chat.id;

    if (!data) {
        return null;
    }

    const messageParts: string[] = [];

    if (data.request.action === 'add question') {

        if (data.response.Questions && data.response.Questions.length && data.response.lastqid) {
            const addedQuestion = data.response.Questions[data.response.Questions.length - 1];

            if (addedQuestion){
                const addedQuestion_output = await formQuestionOutput(chatId, addedQuestion);
                messageParts.push(randomElement([
                    `Added a question:`,
                ]));
                messageParts.push(addedQuestion_output);
            } else {
                messageParts.push(randomElement([
                    `I think I just added the question`,
                ]));
            }


        } else {
            // normally shouldn't happen    
            messageParts.push(`I'm terribly sorry. Something went wrong, and I failed to write that question down.`);

        }

    } else if (data.request.action === 'ask to provide a questionText') {
        messageParts.push(randomElement([
            `waiting for the question text`,
            `now write me your question text`,
            `now write me the actual question text`,
        ]));

    } else if (data.request.action === 'ask to provide smaller questionText') {
        messageParts.push(randomElement([
            `Sorry, but I have a limit of ${TelegramMessageLengthSoftLimit} characters per question. `,
        ]) + randomElement([
            `Try a shorter text`,
            `Try to make it shorter. or split the text in multiple questions`,
        ]));

    } else {
        // should never happen
        return null;

    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
