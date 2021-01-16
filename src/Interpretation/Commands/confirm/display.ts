import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { Awaited } from "../../../reusable/Awaited.type";
import { confirmableSheetMethod_returnType } from "../../../core/sheet/sheet";


export default async function confirm_display(msg: IIMessage,
pendingMethodResult: {
        confirmed: true,
        result: Awaited<confirmableSheetMethod_returnType>
    }
        |
    {
        confirmed: false
    }
)
    : Promise<maybeTelegramBotMessage[]>
{
    
    const chatId = msg.chat.id;

    if (pendingMethodResult.confirmed) {
        const reply = `ok, done`;

        return sendMessageSafely(chatId, reply, {
            parse_mode: 'HTML',
        });
    } else {
        const reply = `ok, not doing that`;
        return sendMessageSafely(chatId, reply, {
            parse_mode: 'HTML',
        });
    }

}
