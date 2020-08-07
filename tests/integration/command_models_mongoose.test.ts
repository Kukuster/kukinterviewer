import Command, { IIMessage, Command_prepare, Command_match, Command_execute, Command_display } from "../../core/Command/Command"
import { Message } from "node-telegram-bot-api";
import mongoose from "../../core/sheet/mongoose";
import { anyJSONvalue, anyJSONobject } from "../../core/anyJSONvalue.type";
import { Document } from "mongoose";

beforeAll(async () => {
    // console.log('executing beforeAll');
    return await mongoose.dbPromise;
})

afterAll(async () => {
    // console.log('executing afterAll');
    const disconnect = await (await mongoose.dbPromise).disconnect();
    return disconnect;
})



const telegram_msg_mock: Message = {
    text: '/findChats ',
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 231079996,
        type: 'private'
    }
}
const chatDocumentId = '5eba8f27091ebc3f2033738e';


const match: Command_match = async function (msg: IIMessage) {
    // console.log('findChats.match');
    return msg.text ?
                msg.text.match(/\/findChats( *)(.*)/) :
                null;
}

const prepare: Command_prepare<{ qids: number[] | undefined }> = async function (msg: IIMessage, match: RegExpMatchArray): Promise<{ qids: number[] | undefined }> {
    // console.log('findChats.prepare');
    let qids;
    if (Array.isArray(match) && match.length && match[2] && match[2].length) {
        qids = match[2].match(/(\d+)/g)?.map(e => parseInt(e));
    }
    return { qids: qids }

}

const execute: Command_execute<
    { qids: number[] | undefined }, 
    { error?: any, result?: Document[] }
> 
= async function (msg: IIMessage, args: { qids: number[] | undefined }) {

    // console.log('findChats.execute');
    const chatId = msg.chat.id;
    const qids = args.qids;

    return new Promise((resolve, reject) => {

        Command.ChatModel.find({ chatId: chatId })
            .exec()
            .then(chat => {

                if (!chat) {
                    console.error('failed to query Questions: Chat document is absent');
                    reject(new Error(JSON.stringify({
                        error: 'There is no such chat document'+chatId ? (': '+chatId+'.') : '.',
                    }, null, 2)));
                    return;
                }

                // let result = chat.Questions;

                // // if qids provided, then output only those
                // if (qids) {
                //     result = result.filter((e: { qid: number; }) => qids.includes(e.qid));
                // }

                resolve({
                    result: chat
                });

            })
            .catch(error => {
                resolve({
                    error: error
                });
            });

    });
    
} //const execute


const display: Command_display<
    { error?: any, result?: Document[] }
>
= async function (msg: IIMessage, response: { error?: any, result?: Document[] }) {
    // console.log('findChats.display');

    if (response?.error){
        console.error(response.error);
    } else if (response.result) {
        return response.result[0]?._id;
        // console.log(resp.result);
    } else {
        console.error('got neither error nor result, which souldn\'t happen!');
    }

    return null;

}

const findChats = new Command(match, prepare, execute, display)





test('Command, custom command run', async (done) => {
    mongoose.dbPromise.then(async ()=>{
        const match = await findChats.match(telegram_msg_mock);
        if (!match) { console.error('ERROR: failed to match!'); return; }
        const args  = await findChats.prepare(telegram_msg_mock, match);
        const resp  = await findChats.execute(telegram_msg_mock, args);
        const _     = await findChats.display(telegram_msg_mock, resp);
        expect(JSON.stringify(_)).toEqual(JSON.stringify(chatDocumentId))
        done();
    });
})


