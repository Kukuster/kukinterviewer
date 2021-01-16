import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { askMeAQuestion_execute_return } from "./execute";
import formQuestionAsked from "../../textForming/formQuestionAsked";
import youDontHaveQuestions from "../../textForming/youDontHaveQuestions";
import randomElement from "../../../reusable/randomElement";


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

    } else {
        messageParts.push(
            youDontHaveQuestions() + '\n' +
            randomElement([
                `You can ${randomElement(['ask', 'tell'])} me to add questions for you`,
            ]),
        );
    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
