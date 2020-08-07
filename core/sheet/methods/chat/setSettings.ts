import ChatModel, { Ichat, settingsSet, settingsKey, Settings } from "../../models/ChatModel";
import mongoose from "../../mongoose";

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

    const DBconnection = await mongoose.dbPromise;

    return new Promise((resolve, reject) => {
        ChatModel.findOne({ chatId: chatId })
        .select({ "Settings": true })
        .exec()
        .then(chat => {

            if (!chat) {
                const error = new Error('tried to query Questions from the chat with chatId=' + chatId + ', which doesn\'t exist');
                console.error(error);
                reject(error);
                return;
            };

            if (typeof settings === 'object'){
                chat.Settings = Object.assign(chat.Settings, settings);
            } else {
                chat.Settings[settings] = value;
            };

            chat.markModified('Settings');

            chat.save()
            .then(chat => {
                resolve(chat);
            })
            .catch(error => {
                console.error('sheet.setSettings: Error while trying to save chat doc! ', 'chatId = ' + chatId);
                reject(error);
            });

        })
        .catch(error => {
            console.error('Error while trying to query chat doc! ', 'chatId = ' + chatId);
            reject(error);
        })
    
    }); // return new Promise
    

}

