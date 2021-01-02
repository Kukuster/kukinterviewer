import { IIMessage } from "../../../core/Command/Command";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { Iquestion } from "../../../core/sheet/models/QuestionModel";


export type listQuestions_execute_return = {
    request: questionsQuery | "all";
    response: Iquestion[];
};

export default async function listQuestions_execute (msg: IIMessage, query: questionsQuery|'all')
    : Promise<listQuestions_execute_return>
{

    return {
        request: query,
        response: await getQuestions(msg.chat.id, query)
    };

}
