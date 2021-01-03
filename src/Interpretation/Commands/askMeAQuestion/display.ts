import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { askMeAQuestion_execute_return } from "./execute";
import formQuestionAsked from "../../textForming/formQuestionAsked";


export default async function askMeAQuestion_display(msg_or_chatId: IIMessage | number, data: askMeAQuestion_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{

    const chatId = typeof msg_or_chatId === 'number' ? msg_or_chatId : msg_or_chatId.chat.id;

    const messageParts: string[] = [];


    if (data.response.question) {

        if (data.response.questionsLeft === 0){

            await sendMessageSafely(chatId, `This is the last question:`, {
                parse_mode: 'HTML',
            });

        }

        messageParts.push(await formQuestionAsked(chatId, data.response.question));

        return sendMessageSafely(chatId, messageParts, {
            parse_mode: 'HTML',
        });

    } else {
        // 
    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
