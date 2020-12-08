import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import turnQuestionsOnOff from "../../../core/sheet/methods/questions/turnQuestionsOnOff";


export default async function turnQuestionsOnOff_execute(msg: IIMessage, args: { turn: 'on'|'off', questions: number[]|'all' }) {

    const chatId = msg.chat.id;

    const { questions, turn } = args;
    
    const tooMuch = questions.length > 3 ||
                    questions === 'all';
                    
    if (tooMuch) { 
        return {
            request: args,
            response: await askConfirmation(chatId, 'turnQuestionsOnOff', JSON.stringify({ qids: questions, status: turn })),
        };
    } else { 
        return {
            request: args,
            response: await turnQuestionsOnOff(chatId, { qids: questions, status: turn }),
        };
     }

}
