import { IIMessage } from "../../../core/Command/Command";
import getTags, { tagsQuery } from "../../../core/sheet/methods/tags/getTags";
import { Itag } from "../../../core/sheet/models/TagModel";


export type listTags_execute_return = {
    request: "all" | tagsQuery;
    response: Itag[] | undefined;
};

export default async function listTags_execute(msg: IIMessage, args: tagsQuery | 'all')
    : Promise<listTags_execute_return>
{

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await getTags(chatId, args),
    };

};
