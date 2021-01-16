import { Job } from "node-schedule";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { IIMessage } from "../../../bot/botlib";
import scheduleNextQuestion from "../../../core/schedule/scheduleNextQuestion";
import switchAsking from "../../../core/sheet/methods/chat/switchAsking";
import queryChat from "../../../core/sheet/methods/functions/queryChat";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { shoot } from "./matchTree";


export type turnAskingOnOff_execute_return = { 
    request: shoot,
    response: {
        switchedAsking: Ichat,
        scheduledNext: Ichat | Job | maybeTelegramBotMessage[] | null | undefined
    }
};

export default async function turnAskingOnOff_execute(msg: IIMessage, arg: shoot)
    : Promise<turnAskingOnOff_execute_return>
{

    const chatId = msg.chat.id;

    return {
        request: arg,
        response: {
            switchedAsking: await switchAsking(chatId, arg),
            scheduledNext: arg === 'on' ?
                await scheduleNextQuestion(chatId, 'auto') :
                // await setChatProperty(chatId, {property: "next_question", value: null}),
                await queryChat(chatId, {"next_question": true}, (chat, save) => {
                    chat.next_question = null;
                    save();
                    return chat;
                }),
        }
    };

}
