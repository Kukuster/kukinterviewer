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
export default async function setSettings(chatId: number, args: { settings: settingsSet })
    : Promise<Ichat>;
export default async function setSettings<T extends settingsKey>(chatId: number, args: { setting: T, value: settingsSet[T] })
    : Promise<Ichat>;
export default async function setSettings<T extends settingsKey>(chatId: number, args: { settings: settingsSet } | { setting: T, value: Settings[T] })
    : Promise<Ichat>
{

    if ('setting' in args && 'value' in args) {
        return queryChat(chatId, { "Settings": true }, (chat, save) => {

            chat.Settings[args.setting] = args.value;

            chat.markModified('Settings');

            save();
            return chat;

        });
    } else {
        return queryChat(chatId, { "Settings": true }, (chat, save) => {

            chat.Settings = Object.assign(chat.Settings, args.settings);

            chat.markModified('Settings');

            save();
            return chat;

        });
    }
    

}

