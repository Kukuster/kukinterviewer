import mongoose from "../../mongoose";
import ChatModel, { Ichat, settingsKey, Settings } from "../../models/ChatModel";



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
export default async function getSettings(chatId: number, settings?: settingsKey)
    : Promise<Settings[settingsKey]>;
/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param setting a field from Settings object in the Chat document, returns entire Settings object if unset
 * @state leaves unchanged
 * @returns the value of the _settings_ field, if specified. Entire Settings object otherwise.
 *
 */
export default async function getSettings(chatId: number, setting?: settingsKey )
    : Promise<Settings | Settings[settingsKey]>
{

    const DBconnection = await mongoose.dbPromise;


    const selectArg: { [key: string]: boolean } = {}
    if (setting){
        selectArg["Settings" + "." + setting] = true
    } else {
        selectArg["Settings"] = true
    }

    return new Promise((resolve, reject)=>{
        ChatModel.findOne({ chatId: chatId })
        .select(selectArg)
        .exec()
        .then(chat => {

            if (!chat) {
                const error = new Error('tried to query Questions from the chat with chatId=' + chatId + ', which doesn\'t exist');
                console.error(error);
                reject(error);
                return;
            };

            if (setting){
                resolve(chat.Settings[setting]);
            } else {
                resolve(chat.Settings);
            }

        })
        .catch(error => {
            console.error(error);
        });
    }); //return new Promise

}
