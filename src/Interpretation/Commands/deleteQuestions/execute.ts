import { IIMessage } from "../../../core/Command/Command";
import deleteQuestions from "../../../core/sheet/methods/questions/deleteQuestions";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export default async function deleteQuestions_execute(msg: IIMessage, query: questionsQuery | 'all') {

    const chatId = msg.chat.id;

    const questions = await getQuestions(chatId, query);

    return {
        request: query,
        response: await deleteQuestions(chatId, questions.map(q => q.qid))
    };

};
