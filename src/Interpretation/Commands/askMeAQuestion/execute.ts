import { IIMessage } from "../../../core/Command/Command";
import switchAsking from "../../../core/sheet/methods/chat/switchAsking";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import turnQuestionsOnOff from "../../../core/sheet/methods/questions/turnQuestionsOnOff";
import { Iquestion } from "../../../core/sheet/models/QuestionModel";


export type askMeAQuestion_response = {
    question: Iquestion,
    questionsLeft: number,
};


export type askMeAQuestion_execute_return = {
    request: questionsQuery;
    response: askMeAQuestion_response;
};

export default async function askMeAQuestion_execute(msg: IIMessage, args: questionsQuery)
    : Promise<askMeAQuestion_execute_return>;
export default async function askMeAQuestion_execute(chatId: number, args: questionsQuery)
    : Promise<askMeAQuestion_execute_return>;
export default async function askMeAQuestion_execute(msg_or_chatId: IIMessage | number, args: questionsQuery)
    : Promise<askMeAQuestion_execute_return>
{
    const chatId = typeof msg_or_chatId === 'number' ? msg_or_chatId : msg_or_chatId.chat.id;


    // for this case (askMeAQuestion), questionsQuery is expected to have "random" flag,
    // for which getQuestions returns an array with a single element
    const randomQuestion = (await getQuestions(chatId, args))[0];
    if (randomQuestion){
        await turnQuestionsOnOff(chatId, {qids: [randomQuestion.qid], status: 'off'});
        /// here should be set "last_time_asked" to "new Date();"
    }

    const enabledQuestions = await getQuestions(chatId, { enabled: true, havingTagsEnabled: true });
    
    const response: askMeAQuestion_response = {
        question: randomQuestion,
        questionsLeft: enabledQuestions.length,
    };
    
    if (response.questionsLeft === 0){
        await switchAsking(chatId, 'off');
    }

    return {
        request: args,
        response: response
    };

}
