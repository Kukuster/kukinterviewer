import { IIMessage } from "../../../core/Command/Command";
import turnQuestionsOnOff from "../../../core/sheet/methods/questions/turnQuestionsOnOff";


export default async function turnQuestionsOnOff_execute(msg: IIMessage, args: { turn: 'on'|'off', questions: number[]|'all' }) {

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await turnQuestionsOnOff(chatId, args.questions, args.turn),
    };

};
