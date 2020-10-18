import { IIMessage } from "../../../core/Command/Command";
import removeTagsFromQuestions from "../../../core/sheet/methods/questions/removeTagsFromQuestions";


export default async function removeTagsFromQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] | 'all' }) {

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await removeTagsFromQuestions(chatId, args.Tags, args.qids)
    };

};
