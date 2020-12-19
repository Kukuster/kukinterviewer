import ChatModel, { Ichat_select, Ichat, Ichat_set } from "../../models/ChatModel";


/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param {object} $set key:value pairs that correspond to properties of Chat document or subproperties with dot notation
 * @returns Promise with a Chat document if resolved, or rejected if any DB errors occur or if Chat document with such chatId doesn't exist
 * 
 */
export default async function updateChat(chatId: number, $set: Ichat_set)
    : Promise<Ichat>
{

    return new Promise<Ichat>((resolve, reject) => {
        ChatModel.findOneAndUpdate({ chatId: chatId }, $set)
            .exec()
            .then(chat => {

                if (!chat) {
                    const error = new Error('tried to update the chat with chatId=' + chatId + ', which doesn\'t exist');
                    console.error(error);
                    reject(error);
                    return null;
                };

                resolve(chat);
                return chat;
            })
            .catch((error: Error) => {
                console.error('Error while trying to update chat doc! ', 'chatId = ' + chatId);
                reject(error);
                return null;
            });
    }); // return new Promise

}
