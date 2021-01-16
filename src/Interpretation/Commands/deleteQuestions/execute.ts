import { IIMessage } from "../../../bot/botlib";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";


export type deleteQuestions_execute_return = {
    request: questionsQuery | "all";
    qids: number[];
    action: 'noop (no such questions)',
    response: null;
} | {
    request: questionsQuery | "all";
    qids: number[];
    action: 'confirm deleting questions',
    response: Ichat_withNonEmptyFields<"intermediate_data">;  
};

export default async function deleteQuestions_execute(msg: IIMessage, query: questionsQuery | 'all')
    : Promise<deleteQuestions_execute_return>
{

    const chatId = msg.chat.id;

    const questions = await getQuestions(chatId, query);

    const qids = questions.map(q => q.qid);

    if (qids.length !== 0) {
        return {
            request: query,
            qids: qids,
            action: 'confirm deleting questions',
            response: await askConfirmation(chatId, 'deleteQuestions', JSON.stringify(qids)),
        };
    } else {
        return {
            request: query,
            qids: qids,
            action: 'noop (no such questions)',
            response: null,
        };
    }

}
