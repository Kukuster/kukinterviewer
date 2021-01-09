import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import addTagsToQuestions, { addTagsToQuestions_result } from "../../../core/sheet/methods/questions/addTagsToQuestions";
import getQuestions from "../../../core/sheet/methods/questions/getQuestions";
import { Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";
import { Iquestion } from "../../../core/sheet/models/QuestionModel";


export type addTagsToQuestions_execute_return = {
    request: {
        qids: number[] | 'all';
        Tags: string[];
    };
    action: 'ask confirmation';
    queriedQuestions: Iquestion[];
    response: Ichat_withNonEmptyFields<"intermediate_data">;
} | {
    request: {
        qids: number[] | 'all';
        Tags: string[];
    };
    action: 'execute sheet method';
    queriedQuestions: Iquestion[];
    response: addTagsToQuestions_result;
};

export default async function addTagsToQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] })
    : Promise<addTagsToQuestions_execute_return>
{

    const chatId = msg.chat.id;

    const { qids } = args;

    const queriedQuestions = await getQuestions(chatId, qids);

    const tooMany = queriedQuestions.length > 3;
    
    if (tooMany) {
        return {
            request: args,
            action: 'ask confirmation',
            queriedQuestions,
            response: await askConfirmation(chatId, 'addTagsToQuestions', JSON.stringify(args)),
        };
    } else { 
        return {
            request: args,
            action: 'execute sheet method',
            queriedQuestions,
            response: await addTagsToQuestions(chatId, args),
        };
    }

}
