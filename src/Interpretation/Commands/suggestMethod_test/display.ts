import { IIMessage } from "../../../core/Command/Command";
import TelegramBot, { bot } from "../../../bot";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export default async function suggestMethod_test_display(msg: IIMessage, chat: Ichat)
    : Promise<TelegramBot.Message>
{
    console.log('suggestMethod_test.display');
    
    const chatId = msg.chat.id;

    const { sheet_method, args_tuple } = chat.pending_method!;

    const pre_response = `this is a test command`;
    const response = `Are you sure you want to execute:
\`sheet.${sheet_method}(${chatId},${args_tuple})\`
?`;

    await bot.sendMessage(chatId, pre_response);

    return bot.sendMessage(chatId, response, {
        parse_mode: 'Markdown'
    });
}
