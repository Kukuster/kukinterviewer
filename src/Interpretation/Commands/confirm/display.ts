import { IIMessage } from "../../../core/Command/Command";
import TelegramBot, { bot, monospace } from "../../../bot";
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
    : Promise<TelegramBot.Message>
{
    
    const chatId = msg.chat.id;

    if (pendingMethodResult.confirmed) {
        const reply = `ok, done`;
        await bot.sendMessage(chatId, monospace(JSON.stringify(pendingMethodResult.result, null, 2)), {
            parse_mode: 'Markdown'
        });
        return bot.sendMessage(chatId, reply, {
            parse_mode: 'Markdown'
        });
    } else {
        const reply = `ok, not doing that`;
        return bot.sendMessage(chatId, reply, {
            parse_mode: 'Markdown'
        });
    }

}
