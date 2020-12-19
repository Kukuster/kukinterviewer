import { excludePrimitiveProperties, nonPrimitiveObject } from "../../../../reusable/mongooseSchemaUpdateSet.type";
import { settingsKey, Settings, Ichat, Ichat_schema } from "../../models/ChatModel";
//import queryReadChat from "../functions/queryReadChat";
import queryChat from "../functions/queryChat";


// TODO: `subprop` works for not all `prop`s. Need more testing and fixing


/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param prop a property in a Chat document
 * @param subprop a property of an object in a Chat document
 * @state leaves unchanged
 * @returns `chat[prop][subprop]` if is `subprop` specified, `chat[prop]` otherwise
 *
 */
export default async function getChatProperty<p extends keyof Ichat>(chatId: number, prop: p, subprop?: undefined)
    : Promise<Ichat[p]>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param prop a property in a Chat document
 * @param subprop a property of an object in a Chat document
 * @state leaves unchanged
 * @returns `chat[prop][subprop]` if is `subprop` specified, `chat[prop]` otherwise
 *
 */
export default async function getChatProperty<p extends keyof excludePrimitiveProperties<Ichat>>(chatId: number, prop: p, subprop: keyof Ichat[p])
    : Promise<Ichat[p][keyof Ichat[p]]>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param prop a property in a Chat document
 * @param subprop a property of an object in a Chat document
 * @state leaves unchanged
 * @returns `chat[prop][subprop]` if is `subprop` specified, `chat[prop]` otherwise
 *
 */
export default async function getChatProperty<p extends keyof Ichat>(chatId: number, prop: p, subprop?: Ichat[p] extends nonPrimitiveObject<Ichat[p]> ? keyof Ichat[p] : undefined)
    : Promise<Ichat[p] extends nonPrimitiveObject<Ichat[p]> ? Ichat[p][keyof Ichat[p]] : Ichat[p]>
{

    const selectArg: { [key: string]: boolean } = {};
    
    if (subprop){
        selectArg[prop + "." + subprop] = true
    } else {
        selectArg[prop] = true
    }


    return queryChat(chatId, selectArg, (chat)=>{

        if (subprop) {
            return chat[prop][subprop as NonNullable<typeof subprop>];
        } else {
            return chat[prop];
        };

    });


}
