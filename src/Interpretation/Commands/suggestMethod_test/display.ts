import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { maybeTelegramBotMessage } from "../../../botlib";


export default async function suggestMethod_test_display(msg: IIMessage, chat: Ichat)
    : Promise<maybeTelegramBotMessage[]>
{
    console.log('suggestMethod_test.display');
    
    const chatId = msg.chat.id;

    const { sheet_method, args_tuple } = chat.intermediate_data.pending_method!;

    const pre_response = `this is a test command`;
    const response = `Are you sure you want to execute:
\`sheet.${sheet_method}(${chatId},${args_tuple})\`
?`;

    await sendMessageSafely(chatId, pre_response);

    return sendMessageSafely(chatId, response, {
        parse_mode: 'Markdown'
    });
}
