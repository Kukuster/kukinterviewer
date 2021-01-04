import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import getQuestions from "../../../core/sheet/methods/questions/getQuestions";
import turnQuestionsOnOff, { turnQuestionsOnOff_result } from "../../../core/sheet/methods/questions/turnQuestionsOnOff";
import { Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";


export type turnQuestionsOnOff_execute_return = {
    request: {
        turn: 'on' | 'off';
        questions: number[] | 'all';
    };
    action: 'ask confirmation';
    qids: number[];
    response: Ichat_withNonEmptyFields<"intermediate_data">;
} | {
    request: {
        turn: 'on' | 'off';
        questions: number[] | 'all';
    };
    action: 'execute sheet method';
    qids: number[];
    response: turnQuestionsOnOff_result;
};

export default async function turnQuestionsOnOff_execute(msg: IIMessage, args: { turn: 'on'|'off', questions: number[]|'all' })
    : Promise<turnQuestionsOnOff_execute_return>
{

    const chatId = msg.chat.id;

    const { questions, turn } = args;

    const qids = (await getQuestions(chatId, questions)).map(q => q.qid);

    const tooMany = qids.length > 3;

    if (tooMany) { 
        return {
            request: args,
            action: 'ask confirmation',
            qids: qids,
            response: await askConfirmation(chatId, 'turnQuestionsOnOff', JSON.stringify({ qids: qids, status: turn })),
        };
    } else { 
        return {
            request: args,
            action: 'execute sheet method',
            qids: qids,
            response: await turnQuestionsOnOff(chatId, { qids: qids, status: turn }),
        };
     }

}
