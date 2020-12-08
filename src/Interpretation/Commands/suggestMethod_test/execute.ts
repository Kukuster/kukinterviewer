import { IIMessage } from "../../../core/Command/Command";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import { confirmableSheetMethod } from "../../../core/sheet/sheet";
import { Ichat } from "../../../core/sheet/models/ChatModel";


export default async function suggestMethod_test_execute(msg: IIMessage, method_and_args: [confirmableSheetMethod, string | undefined])
    : Promise<Ichat>
{
    console.log('suggestMethod_test.execute');
    
    const chatId = msg.chat.id;

    // changes chat state to `'pending confirmation'`
    return askConfirmation(chatId, method_and_args[0], method_and_args[1] || '""');
}
