import { IIMessage } from "../../../bot/botlib";
import createNewChat from "../../../core/sheet/methods/chat/createNewChat";
import getChat from "../../../core/sheet/methods/chat/getChat";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export type start_execute_return = {
    request: true;
    response: {
        chat: Ichat;
        description: "the chat document already exists, here it is" | "created a new chat document, now waiting for timezone";
    };
};

export default async function start_execute(msg: IIMessage, arg: true)
    : Promise<start_execute_return>
{

    const chatId = msg.chat.id; 

    const chat = await getChat(chatId);

    if (chat){
        return {
            request: arg,
            response: {
                chat,
                description: "the chat document already exists, here it is",
            },
        };
    } else {
        return {
            request: arg,
            response: {
                chat: await createNewChat(chatId, {state: 'asking for timezone'}),
                description: "created a new chat document, now waiting for timezone",
            },
        };
    }

}
