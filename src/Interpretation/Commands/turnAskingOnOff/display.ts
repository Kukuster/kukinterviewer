import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { turnAskingOnOff_execute_return } from "./execute";
import randomElement from "../../../reusable/randomElement";


export default async function turnAskingOnOff_display(msg: IIMessage, data: turnAskingOnOff_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{

    const chatId = msg.chat.id;

    const messageParts: string[] = [];


    if (data.request === 'on'){
        messageParts.push(randomElement([
            `${randomElement(['Ok, I will ask you questions','Ok, asking you questions','Alright, will be asking you','Ok, going to ask you questions'])}${randomElement([' regularly',''])}${randomElement([' as per your settings',''])}`,
        ]));
    } else if (data.request === 'off'){
        messageParts.push(randomElement([
            `Ok, I won't ask you questions`,
            `Ok, I stop asking you questions`,
            `Ok, I won't be asking you questions`,
            `Ok, not asking you anymore`,
            `Ok, not asking you anymore`,
        ]));
    }


    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}