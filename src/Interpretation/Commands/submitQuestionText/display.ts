import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage, TelegramMessageLengthSoftLimit } from "../../../bot/botlib";
import { submitQuestionText_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import formQuestionOutput from "../../textForming/formQuestionOutput";


export default async function submitQuestionText_display(msg: IIMessage, data: submitQuestionText_execute_return)
    : Promise<maybeTelegramBotMessage[] | null>
{

    const chatId = msg.chat.id;

    const messageParts: string[] = [];


    if (data.request.action === 'add question') {

        if (data.response.Questions && data.response.Questions.length && data.response.lastqid) {
            const addedQuestion = data.response.Questions[data.response.Questions.length - 1];

            if (addedQuestion) {
                const addedQuestion_output = await formQuestionOutput(chatId, addedQuestion);
                messageParts.push(either([
                    `Added a question:`,
                ]));
                messageParts.push(addedQuestion_output);
            } else {
                messageParts.push(either([
                    `I think I just added the question`,
                ]));
            }

        } else {
            // normally shouldn't happen    
            messageParts.push(`I'm terribly sorry. Something went wrong, and I failed to write that question down.`);

        }


    } else if (data.request.action === 'ask to provide smaller questionText') {
        messageParts.push(either([
            `Sorry, but I have a limit of ${TelegramMessageLengthSoftLimit} characters per question. `,
        ]) + either([
            `Try a shorter text`,
            `Try to make it shorter. or split the text in multiple questions`,
        ]));

    } else if (data.request.action === 'ask to provide a questionText (only Tags provided)') {
        messageParts.push(either([
            `ok, you provided the tags, but I need an actual question text`,
            `ok, I'll use these tags, but I need an actual question text`,
        ]));

    } else if (data.request.action === 'deny') {
        messageParts.push(either([
            `ok, I'm not adding a question`,
            `ok, not adding a question`,
        ]));

    }


    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
