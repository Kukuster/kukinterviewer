import { IIMessage } from "../../../bot/botlib";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import getQuestions from "../../../core/sheet/methods/questions/getQuestions";
import removeTagsFromQuestions, { removeTagsFromQuestions_result } from "../../../core/sheet/methods/questions/removeTagsFromQuestions";
import { Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";
import { Iquestion } from "../../../core/sheet/models/QuestionModel";


export type removeTagsFromQuestions_execute_return = {
    request: {
        qids: number[] | 'all';
        Tags: string[] | 'all';
    };
    action: 'ask confirmation';
    queriedQuestions: Iquestion[];
    response: Ichat_withNonEmptyFields<"intermediate_data">;
} | {
    request: {
        qids: number[] | 'all';
        Tags: string[] | 'all';
    };
    action: 'execute sheet method';
    queriedQuestions: Iquestion[];
    response: removeTagsFromQuestions_result;
};

export default async function removeTagsFromQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] | 'all' })
    : Promise<removeTagsFromQuestions_execute_return>
{

    const chatId = msg.chat.id;

    const { qids, Tags } = args;
    
    const sheetMethodArgs = Object.assign(args, { correctQuestionText: true });

    const queriedQuestions = await getQuestions(chatId, qids);

    const tooMany = queriedQuestions.length > 3 ||
                    Tags.length > 3 ||
                    (Tags === 'all' && queriedQuestions.length > 1);

    if (tooMany) {
        return {
            request: args,
            action: 'ask confirmation',
            queriedQuestions,
            response: await askConfirmation(chatId, 'removeTagsFromQuestions', JSON.stringify(sheetMethodArgs)),
        };
    } else { 
        return {
            request: args,
            action: 'execute sheet method',
            queriedQuestions,
            response: await removeTagsFromQuestions(chatId, sheetMethodArgs)
        };
     }

}
