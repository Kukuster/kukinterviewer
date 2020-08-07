import Command, { IIMessage, Command_prepare, Command_match, Command_execute, Command_display } from "../../core/Command/Command"
import { Message } from "node-telegram-bot-api";
import mongoose from "../../core/sheet/mongoose";

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
    console.log('findChats.match');
    return msg.text ?
                msg.text.match(/\/findChats( *)(.*)/) :
                null;
}

const prepare: Command_prepare<{ qids: number[] | undefined }> = async function (msg: IIMessage, match: RegExpMatchArray): Promise<{ qids: number[] | undefined }> {
    console.log('findChats.prepare');
    let qids;
    if (Array.isArray(match) && match.length && match[2] && match[2].length) {
        qids = match[2].match(/(\d+)/g)?.map(e => parseInt(e));
    }
    return { qids: qids }

}

const execute: Command_execute<{ qids: number[] | undefined }> = async function (this: Command<{ qids: number[] | undefined }>, msg: IIMessage, args: { qids: number[] | undefined }) {
    console.log('findChats.execute');
    const chatId = msg.chat.id;
    const qids = args.qids;

    return new Promise((resolve, reject) => {

        Command.ChatModel.find({ chatId: chatId })
            .exec()
            .then(chat => {

                if (!chat) {
                    console.log('failed to query Questions: Chat document is absent');
                    reject(JSON.stringify({
                        error: 'There is no such chat document'+chatId ? ': '+chatId+'.' : '.',
                    }, null, 2));
                    return;
                }

                // let result = chat.Questions;

                // // if qids provided, then output only those
                // if (qids) {
                //     result = result.filter((e: { qid: number; }) => qids.includes(e.qid));
                // }

                resolve(JSON.stringify({
                    result: chat
                }, null, 2));

            })
            .catch(error => {
                resolve(JSON.stringify({
                    error: error
                }, null, 2));
            });

    });
    
}

const display: Command_display = async function (msg: IIMessage, response: string) {
    console.log('findChats.display');

    const resp = JSON.parse(response);

    if (resp.error){
        console.error(resp.error);
    } else if (resp.result) {
        return resp.result[0]._id;
        // console.log(resp.result);
    } else {
        console.log('got neither error nor result, which souldn\'t happaned!');
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
        expect(_).toBe(chatDocumentId)
        done();
    });
})


