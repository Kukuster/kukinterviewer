'use strict';
import { confirmableSheetMethod, confirmableSheetMethod_returnType } from "../../sheet";
import executeMethod from "../executeMethod";
import queryChat from "../functions/queryChat";
import { Awaited } from '../../../../reusable/Awaited.type';
import { is_Ichat_schema_withNonEmptyFields } from "../../models/ChatModel";


type confirmedResponse = {
    confirmed: true,
    result: Awaited<confirmableSheetMethod_returnType>,
    executedMethod?: confirmableSheetMethod,
    args_serialized?: string,
};

type deniedResponse = {
    confirmed: false,
    result: null,
};

/**
 * 
 * Executes the pending sheet method that was set for awaiting for confirmation with `sheet.askConfirmation` (awaiting statically, in the db)
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @state sets chat state to previous state (to whatever it was before asking to confirm the method)
 * 
 */
export default async function confirmPendingMethod(chatId: number)
    : Promise < confirmedResponse | deniedResponse >
{

    return queryChat(chatId, { "intermediate_data": true, "state": true }, async (chat, saveChat) => {
        const pendingMethod = chat.intermediate_data!.pending_method;
        if (pendingMethod){

            const { sheet_method, args_tuple, prev_state } = pendingMethod;

            chat.state = prev_state;

            const result = await executeMethod(chatId, sheet_method, args_tuple);

            if (is_Ichat_schema_withNonEmptyFields(result, ['state']) && result.state) {
                chat.state = result.state;
            }
            if (is_Ichat_schema_withNonEmptyFields(result, ['intermediate_data']) && result.intermediate_data) {
                chat.intermediate_data = result.intermediate_data;
            }

            
            if (!chat.intermediate_data) {
                chat.intermediate_data = {};
            }
            chat.intermediate_data.pending_method = null;


            chat.markModified('intermediate_data');
            // NOTE: if the executed sheet method returns Ichat and uses "intermediate_data" field,
            // the "intermediate_data" field won't be rewritten

            saveChat();

            return {
                confirmed: true,
                result: result,
                executedMethod: sheet_method,
                args_serialized: args_tuple,
            };

        } else {
            return {
                confirmed: false,
                result: null,
            };
        }

    });

}
