import { Job } from "node-schedule";
import { IIMessage } from "../../../core/Command/Command";
import scheduleNextQuestion from "../../../core/schedule/scheduleNextQuestion";
import setChatProperty from "../../../core/sheet/methods/chat/setChatProperty";
import switchAsking from "../../../core/sheet/methods/chat/switchAsking";
import queryChat from "../../../core/sheet/methods/functions/queryChat";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { askMeAQuestion_response } from "../askMeAQuestion/execute";
import { shoot } from "./matchTree";

export default async function turnAskingOnOff_execute(msg: IIMessage, arg: shoot)
    : Promise<{ 
        request: shoot,
        response: {
            switchedAsking: Ichat,
            scheduledNext: Ichat | {
                request: questionsQuery;
                response: askMeAQuestion_response;
            } | Job | null | undefined
        }
    }>
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
