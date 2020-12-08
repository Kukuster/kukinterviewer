import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import turnTagsOnOff from "../../../core/sheet/methods/tags/turnTagsOnOff";


export default async function turnTagsOnOff_execute(msg: IIMessage, args: { Tags: string[] | "all", turn: "on" | "off" }) {

    const chatId = msg.chat.id;

    const { Tags, turn } = args;
    
    const tooMuch = Tags.length > 3 ||
                    Tags === 'all';
                    

    if (tooMuch) {
        return {
            request: args,
            response: await askConfirmation(chatId, 'turnTagsOnOff', JSON.stringify({ Tags: Tags, status: turn })),
        };
    } else { 
        return {
            request: args,
            response: await turnTagsOnOff(chatId, { Tags: Tags, status: turn }),
        };
    }
    

}
