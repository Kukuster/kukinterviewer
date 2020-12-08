import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import removeTagsFromQuestions from "../../../core/sheet/methods/questions/removeTagsFromQuestions";


export default async function removeTagsFromQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] | 'all' }) {

    const chatId = msg.chat.id;
    
    const sheetMethodArgs = Object.assign(args, { correctQuestionText: true });

    const tooMuch = args.qids.length > 1 ||
                    args.qids === 'all'  ||
                    args.Tags === 'all';

    if (tooMuch) {
        return {
            request: args,
            response: await askConfirmation(chatId, 'removeTagsFromQuestions', JSON.stringify(sheetMethodArgs)),
        };
    } else { 
        return {
            request: args,
            response: await removeTagsFromQuestions(chatId, sheetMethodArgs)
        };
     }

}
