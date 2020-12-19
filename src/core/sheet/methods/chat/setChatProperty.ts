import { Ichat, settingsSet, settingsKey, Settings, Ichat_schema, Ichat_set } from "../../models/ChatModel";
import queryChat from "../functions/queryChat";

/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param $set an object of key:value pairs to set for the document
 * @param property a Chat document property key
 * @param value value of a single document property to set
 * @state leaves unchanged unless `state` property is changed directly
 * @returns mongoose query result
 *
 */
export default async function setChatProperty(chatId: number, args: { $set: Ichat_set })
    : Promise<Ichat>;
export default async function setChatProperty<T extends keyof Ichat>(chatId: number, args: { property: T, value: Ichat[T] })
    : Promise<Ichat>;
export default async function setChatProperty<T extends keyof Ichat>(chatId: number, args: { $set: Ichat_set } | { property: T, value: Ichat[T] })
    : Promise<Ichat>
{

    if ('property' in args && 'value' in args) {
        const select: { [K in T]?: true } = {};
        select[args.property] = true;
        return queryChat(chatId, select, (chat, save) => {

            chat[args.property] = args.value;

            chat.markModified(args.property);

            save();
            return chat;

        });
    } else {
        return queryChat(chatId, { }, (chat, save) => {

            chat.Settings = Object.assign(chat.Settings, args.$set);

            chat.markModified('Settings');

            save();
            return chat;

        });
    }
    

}

