import { IIMessage } from "../../../core/Command/Command";
import getQuestions, { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import turnQuestionsOnOff from "../../../core/sheet/methods/questions/turnQuestionsOnOff";


export default async function askMeAQuestion_execute(msg: IIMessage, args: questionsQuery) {

    const chatId = msg.chat.id;

    const randomQuestion = (await getQuestions(chatId, args))[0];

    if (randomQuestion){
        turnQuestionsOnOff(chatId, [randomQuestion.qid], 'off');
    }

    return {
        request: args,
        // for this case (askMeAQuestion), questionsQuery is expected to have "random" flag,
        // for which getQuestions returns an array with a single element
        response: randomQuestion
    };

};
