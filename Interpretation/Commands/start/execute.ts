import { IIMessage } from "../../../core/Command/Command";
import getChat from "../../../core/sheet/methods/chat/getChat";

export default async function start_execute(msg: IIMessage, arg: boolean) {

    // TODO: creates chat here, because when starting it shouldn't exist yet

    return {
        request: arg,
        response: await getChat(msg.chat.id)
    };

};
