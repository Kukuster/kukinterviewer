import { IIMessage } from "../../../core/Command/Command";
import turnTagsOnOff from "../../../core/sheet/methods/tags/turnTagsOnOff";


export default async function turnTagsOnOff_execute(msg: IIMessage, args: { Tags: string[] | "all", turn: "on" | "off" }) {

    const chatId = msg.chat.id;

    return {
        request: args,
        response: await turnTagsOnOff(chatId, args.Tags, args.turn),
    };

};
