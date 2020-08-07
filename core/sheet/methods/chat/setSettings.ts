import { Ichat, settingsSet, settingsKey, Settings } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";

/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param settings a Settings property key, OR an object of key-value pairs
 * @param value value of a single _setting_ to set
 * @state leaves unchanged
 * @returns mongoose query result
 *
 */
export default async function setSettings(chatId: number, settings: settingsSet, value?: undefined)
    : Promise<Ichat>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param settings a Settings property key, OR an object of key-value pairs
 * @param value value of a single _setting_ to set
 * @state leaves unchanged
 * @returns mongoose query result
 *
 */
export default async function setSettings<T extends settingsKey>(chatId: number, settings: T, value: settingsSet[T])
    : Promise<Ichat>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param settings a Settings property key, OR an object of key-value pairs
 * @param value value of a single _setting_ to set
 * @state leaves unchanged
 * @returns mongoose query result
 *
 */
export default async function setSettings<T extends settingsKey>(chatId: number, settings: settingsSet | T, value: Settings[T])
    : Promise<Ichat>
{

    return queryChat(chatId, { "Settings": true }, (chat, save)=>{

        if (typeof settings === 'object') {
            chat.Settings = Object.assign(chat.Settings, settings);
        } else {
            chat.Settings[settings] = value;
        };

        chat.markModified('Settings');

        save();
        return chat;

    });
    

}

