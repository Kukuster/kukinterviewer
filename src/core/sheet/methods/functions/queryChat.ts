import ChatModel, { Ichat } from "../../models/ChatModel";


/**
 *
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param select specifies which document fields to include or exclude (also known as the query "projection")
 * @param {callback} perform function to execute on the queried data.
 * Arguments passed are:
 * - queried `Chat` document object
 * - saveChat function. If called, saves (rewrites) chat document after _perform_ function returns a value, but before the _queryChat_ function resolves the returned value
 *  
 * @returns Promise with _perform_ function return value resolved, or rejected if any DB errors occur
 * 
 */
export default async function queryChat<T>(chatId: number, select: any, perform: (chat: Ichat, saveChat: ()=>void) => T)
    : Promise<T>
{

    return new Promise((resolve, reject) => {
        ChatModel.findOne({ chatId: chatId })
            .select(select)
            .exec()
            .then(chat => {

                if (!chat) {
                    const error = new Error('tried to query the chat with chatId=' + chatId + ', which doesn\'t exist');
                    console.error(error);
                    reject(error);
                    return;
                };

                let saveChat = false;

                const result = perform(chat, ()=>{
                    saveChat = true;
                });

                if (saveChat){
                    chat.save()
                    .then(chat => {
                        resolve(result);
                    })
                    .catch(error => {
                        console.error('Error while trying to save chat doc! ', 'chatId = '+chatId);
                        reject(error);
                    });
                } else {
                    resolve(result);
                }

            })
            .catch(error => {
                console.error('Error while trying to query chat doc! ', 'chatId = ' + chatId);
                reject(error);
            });;


    }); // return new Promise

}
