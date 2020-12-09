import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import addTagsToQuestions from "../../../core/sheet/methods/questions/addTagsToQuestions";


export default async function addTagsToQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] }) {

    const chatId = msg.chat.id;

    const tooMuch = args.qids === 'all' ||
                    args.qids.length > 3;
    
    if (tooMuch) {
        return {
            request: args,
            response: await askConfirmation(chatId, 'addTagsToQuestions', JSON.stringify(args)),
        };
    } else { 
        return {
            request: args,
            response: await addTagsToQuestions(chatId, args),
        };
    }

}
