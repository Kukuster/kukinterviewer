import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import deleteQuestions from "../../../core/sheet/methods/questions/deleteQuestions";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export default async function deleteQuestions_execute(msg: IIMessage, query: questionsQuery | 'all') {

    const chatId = msg.chat.id;

    const questions = await getQuestions(chatId, query);

    const qids = questions.map(q => q.qid);

    if (qids.length > 1) { 
        return {
            request: query,
            response: await askConfirmation(chatId, 'deleteQuestions', JSON.stringify(qids))
        };
    } else {
        return {
            request: query,
            response: await deleteQuestions(chatId, qids)
        };
    }



}
