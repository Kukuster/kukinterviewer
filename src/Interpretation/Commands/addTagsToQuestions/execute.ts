import { IIMessage } from "../../../core/Command/Command";
import addTagsToQuestions from "../../../core/sheet/methods/questions/addTagsToQuestions";


export default async function addTagsToQuestions_execute(msg: IIMessage, args: { qids: number[] | 'all', Tags: string[] }) {

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await addTagsToQuestions(chatId, args.Tags, args.qids),
    };

};
