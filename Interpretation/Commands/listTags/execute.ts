import { IIMessage } from "../../../core/Command/Command";
import getTags, { tagsQuery } from "../../../core/sheet/methods/tags/getTags";


export default async function listTags_execute(msg: IIMessage, args: tagsQuery | 'all') {

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await getTags(chatId, args),
    };

};
