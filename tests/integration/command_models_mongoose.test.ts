import Command, { IIMessage, Command_prepare, Command_match, Command_execute, Command_display } from "../../src/core/Command/Command"
// import { Message } from "node-telegram-bot-api";
import mongoose, { DBconnection } from "../../src/core/sheet/mongoose";

type Document = mongoose.Document;

////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Test data            ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const telegram_msg_mock: IIMessage = {
    text: '/findChats ',
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 231079996,
        type: 'private'
    }
};

// this should be set to a mongodb document ID of the chat with that chatId
const chatDocumentId = '5fea34957662551c332b620d';


const match: Command_match<RegExpMatchArray> = async function (msg: IIMessage) {
    // console.log('findChats.match');
    return msg.text ?
                msg.text.match(/\/findChats( *)(.*)/) :
                null;
};

const prepare: Command_prepare<RegExpMatchArray, { qids: number[] | undefined }> = async function (msg: IIMessage, match: RegExpMatchArray): Promise<{ qids: number[] | undefined }> {
    // console.log('findChats.prepare');
    let qids;
    if (Array.isArray(match) && match.length && match[2] && match[2].length) {
        qids = match[2].match(/(\d+)/g)?.map(e => parseInt(e));
    }
    return { qids: qids }

};

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
                    const error = new Error('There is no such chat document'+chatId ? (': '+chatId+'.') : '.');
                    console.error(error);
                    reject(error);
                    return;
                }

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
    
}; //const execute


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

};

const findChats = new Command(match, prepare, execute, display);


const decide = async function (command: Command<any, any, any>){
    const match = await command.match(telegram_msg_mock);
    if (!match) { console.error('ERROR: failed to match!'); return; }
    const args  = await command.prepare(telegram_msg_mock, match);
    const resp  = await command.execute(telegram_msg_mock, args);
    return        await command.display(telegram_msg_mock, resp);
};



///// Variables that hold calculation results /////

let result: any;



////////////////////////////////////////////////////////
///////////                                  ///////////
///////////      Run tested calculations     ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


beforeAll(async () => {
    await DBconnection;

    result = await decide(findChats);

    return await (await DBconnection).disconnect();
});



////////////////////////////////////////////////////////
///////////                                  ///////////
///////////          Testing results         ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


test('a custom Command (all methods) using mongoose DB & models', () => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(chatDocumentId));
});


