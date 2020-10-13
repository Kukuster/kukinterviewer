import { IIMessage } from "../../../core/Command/Command";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";

export default async function listQuestions_execute (msg: IIMessage, query: questionsQuery|'all') {

    return getQuestions(msg.chat.id, query);

};
