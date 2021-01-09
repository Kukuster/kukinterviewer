import { settingsKey, Settings } from "../../models/ChatModel";
//import queryReadChat from "../functions/queryReadChat";
import queryChat from "../functions/queryChat";



/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param settings a field from Settings object in the Chat document, returns entire Settings object if unset
 * @state leaves unchanged
 * @returns the value of the _settings_ field, if specified. Entire Settings object otherwise.
 *
 */
export default async function getSettings(chatId: number, settings?: undefined)
    : Promise<Settings>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param settings a field from Settings object in the Chat document, returns entire Settings object if unset
 * @state leaves unchanged
 * @returns the value of the _settings_ field, if specified. Entire Settings object otherwise.
 *
 */
export default async function getSettings<K extends settingsKey>(chatId: number, settings?: K)
    : Promise<Settings[K]>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param setting a field from Settings object in the Chat document, returns entire Settings object if unset
 * @state leaves unchanged
 * @returns the value of the _settings_ field, if specified. Entire Settings object otherwise.
 *
 */
export default async function getSettings<K extends settingsKey>(chatId: number, setting?: K)
    : Promise<Settings | Settings[K]>
{

    const selectArg: { [key: string]: boolean } = {}
    if (setting){
        selectArg["Settings" + "." + setting] = true
    } else {
        selectArg["Settings"] = true
    }


    return queryChat(chatId, selectArg, (chat)=>{

        if (setting) {
            return chat.Settings[setting];
        } else {
            return chat.Settings;
        };

    });


}
