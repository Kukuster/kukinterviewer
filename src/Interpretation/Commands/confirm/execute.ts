import { IIMessage } from "../../../core/Command/Command";
import confirmPendingMethod from "../../../core/sheet/methods/pending_method/confirmPendingMethod";
import denyPendingMethod from "../../../core/sheet/methods/pending_method/denyPendingMethod";
import { confirmableSheetMethod_returnType } from "../../../core/sheet/sheet";
import { Awaited } from "../../../reusable/Awaited.type";
import { shoot } from "./matchTree";


export default async function confirm_execute(msg: IIMessage, confirm_or_deny: shoot)
    : Promise<
    {
        confirmed: true,
        result: Awaited<confirmableSheetMethod_returnType>
    }
        |
    {
        confirmed: false
    }
    >
{
    
    const chatId = msg.chat.id;

    if (confirm_or_deny === 'confirm') {
        const { confirmed, result } = await confirmPendingMethod(chatId);
        return {
            confirmed,
            result
        };
    } else {
        await denyPendingMethod(chatId);
        return {
            confirmed: false,
        };
    }

}
