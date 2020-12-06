import { IIMessage } from "../../../core/Command/Command";
import createNewChat from "../../../core/sheet/methods/chat/createNewChat";
import getChat from "../../../core/sheet/methods/chat/getChat";

export default async function start_execute(msg: IIMessage, arg: boolean) {

    const chatId = msg.chat.id; 

    const chat = await getChat(chatId);

    if (chat){
        return {
            request: arg,
            response: chat,
        };
    } else {
        return {
            request: arg,
            response: await createNewChat(chatId)
        };
    }

}
