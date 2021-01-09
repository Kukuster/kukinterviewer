import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import getTags from "../../../core/sheet/methods/tags/getTags";
import turnTagsOnOff, { turnTagsOnOff_result } from "../../../core/sheet/methods/tags/turnTagsOnOff";
import { Ichat_withNonEmptyFields } from "../../../core/sheet/models/ChatModel";
import { Itag } from "../../../core/sheet/models/TagModel";


export type turnTagsOnOff_execute_return = {
    request: {
        Tags: string[] | "all";
        turn: "on" | "off";
    };
    action: 'ask confirmation';
    queriedTags: Itag[];
    response: Ichat_withNonEmptyFields<"intermediate_data">;
} | {
    request: {
        Tags: string[] | "all";
        turn: "on" | "off";
    };
    action: 'execute sheet method';
    queriedTags: Itag[];
    response: turnTagsOnOff_result;
};

export default async function turnTagsOnOff_execute(msg: IIMessage, args: { Tags: string[] | "all", turn: "on" | "off" })
    : Promise<turnTagsOnOff_execute_return>
{

    const chatId = msg.chat.id;

    const { Tags, turn } = args;

    const queriedTags = (await getTags(chatId, Tags === 'all' ? Tags : {tagStr: Tags}));

    const tooMany = queriedTags.length > 3;

    if (tooMany) {
        return {
            request: args,
            action: 'ask confirmation',
            queriedTags,
            response: await askConfirmation(chatId, 'turnTagsOnOff', JSON.stringify({ Tags: Tags, status: turn })),
        };
    } else {
        return {
            request: args,
            action: 'execute sheet method',
            queriedTags,
            response: await turnTagsOnOff(chatId, { Tags: Tags, status: turn }),
        };
    }
    

}
