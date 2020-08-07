import { Message, ChatType } from "node-telegram-bot-api";
import { decide } from "../../Interpretation/decide";
import mongoose from "../../core/sheet/mongoose";
import State from "../../core/State/State";
import Command, { Command_match, IIMessage, Command_prepare, Command_execute, Command_display } from "../../core/Command/Command";
import ChatModel, { Ichat } from "../../core/sheet/models/ChatModel";
import * as fs from 'fs'



beforeAll(async () => {
    // console.log('executing beforeAll');
    return await mongoose.dbPromise;
})

afterAll(async () => {
    // console.log('executing afterAll');
    const disconnect = await (await mongoose.dbPromise).disconnect();
    return disconnect;
})





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////      Telegram message mock       ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const chatId = 1000;
const chat_mock = {
    //id: 231079996,
    id: chatId,
    type: <ChatType>'private'
};
const user_mock = {
    id: 1111,
    first_name: 'TelegramMockMessage_User',
    is_bot: true
}

const telegram_msg_mock: Message = {
    text: 'Hi!',
    message_id: 2222,
    date: 3333,
    chat: chat_mock,
    from: user_mock

};

const telegram_msg2_mock: Message = {
    text: 'Forget me forever!',
    message_id: 2223,
    date: 3334,
    chat: chat_mock,
    from: user_mock
};




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////        createChat COMMAND        ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


type createChatExecArgs = { chatId: number };
type createChatDispArgs = { result?: Ichat, error?: any, reply: string };


const createChatMatch: Command_match 
= async function(msg: IIMessage){
    // console.log('createChat: Match');
    const message = msg.text;
    return message?.match(/(hi|hello)[\s\S]*/i);
}


const createChatPrepare: Command_prepare<createChatExecArgs> 
= async function (msg: IIMessage, match: RegExpMatchArray) {
    // console.log('createChat: Prepare');
    return { 'chatId': msg.chat.id };
}


const createChatExecute: Command_execute<createChatExecArgs, createChatDispArgs> 
= async function (msg: IIMessage, args: createChatExecArgs) {
    // console.log('createChat: Execute');
    
    const chatId = msg.chat.id;

    const findChatResult = await ChatModel.find({ chatId: chatId }).select({"_id": true}).exec();
    
    if (findChatResult.length && findChatResult[0]._id) {
        const chatDocAlreadyExistsErr = new Error(`executing createChat command, while the chat document already exists.
This command should not be available for those who already started!`);
        console.error(chatDocAlreadyExistsErr);
        return { error: JSON.stringify(chatDocAlreadyExistsErr.message), reply: '' };
    }

    const mongooseDB = await mongoose.dbPromise;

    const chat = new ChatModel({
        _id: new mongooseDB.Types.ObjectId(),
        chatId: chatId,
        Questions: [],
        lastqid: 0,
        Pending_to_delete: [],
        Settings: {
            enabled: false,
            //timezone: undefined,
            //asking_period_mins: 120,
            //asking_time_of_day: { from_hour: 10, to_hour: 18 }
        },
        //last_time_asked: new Date(),
        //running: false,
        state: 'ready',
        //Schedule: { qid: -1, datetime: new Date() }
    });

    //dev
    // console.log('// Formed chat object (document):');
    // console.log(chat);
    // console.log('// going to write this to the DB');

    const reply =
        msg.from?.first_name ?
            'Greetings, ' + msg.from.first_name + '!' :
            'Greetings!';

    try {        
        return {
            result: await chat.save(),
            reply: reply
        };
    } catch (e) {
        return {
            error: e,
            reply: 'Something went wrong when i tried to sign you up... Sorry, try again later'
        }
    }

} // createChatExecute


const createChatDisplay: Command_display<createChatDispArgs>
= async function (msg: IIMessage, response: createChatDispArgs){
    // console.log('createChat: Display');

    return response;

} 


/**
 * 
 * @state sets to `'ready'` if new user OR leaves unchanged otherwise
 * 
 */
const createChat = new Command(createChatMatch, createChatPrepare, createChatExecute, createChatDisplay);







////////////////////////////////////////////////////////
///////////                                  ///////////
///////////        deleteChat COMMAND        ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


type deleteChatExecArgs = { chatId: number };
type deleteChatDispArgs = { 
    result: { n?: number, ok?: number, deletedCount?: number },
    reply: string
} | {
    error: any,
    reply: string
};



const deleteChatMatch: Command_match 
= async function(msg: IIMessage){
    // console.log('deleteChat: Match');
    const message = msg.text;
    return message?.match(/(forget)[\s]*(me)[\s]*(forever)[\s\S]*/i);
}


const deleteChatPrepare: Command_prepare<deleteChatExecArgs> 
= async function (msg: IIMessage, match: RegExpMatchArray) {
    // console.log('deleteChat: Prepare');
    return { 'chatId': msg.chat.id };
}


const deleteChatExecute: Command_execute<deleteChatExecArgs, deleteChatDispArgs> 
= async function (msg: IIMessage, args: deleteChatExecArgs) {
    // console.log('deleteChat: Execute');
    
    const chatId = msg.chat.id;

    const findChatResult = await ChatModel.find({ chatId: chatId }).select({"_id": true}).exec();
    
    if (!findChatResult.length || !findChatResult[0]._id) {
        const chatDocNotExistsErr = new Error(`executing deleteChat command, while the chat document doesn't exist.
This command should not be available for those who didn't start!`);
        console.error(chatDocNotExistsErr);
        return { error: JSON.stringify(chatDocNotExistsErr.message), reply: '' };
    }

    const mongooseDB = await mongoose.dbPromise;

    const reply =
        msg.from?.first_name ?
            'Goodbye, ' + msg.from.first_name + '! I won\'t remebmer you! :(' :
            'Goodbye! I won\'t remebmer you! :(';

    try {        
        return {
            result: await ChatModel.deleteOne({ chatId: chatId }),
            reply: reply
        };
    } catch (e) {
        return {
            error: e,
            reply: `Something went wrong when i tried to forget you... Maybe you are unforgettable :)
Sorry for that, try again later`
        }
    }

} // deleteChatExecute


const deleteChatDisplay: Command_display<deleteChatDispArgs>
= async function (msg: IIMessage, response: deleteChatDispArgs){
    // console.log('deleteChat: Display');

    return response;

} 


/**
 * 
 * @state sets to `undefined` by deleteing the chat document (equivalent to `'greet'`) OR leaves unchanged if user is new
 * 
 */
const deleteChat = new Command(deleteChatMatch, deleteChatPrepare, deleteChatExecute, deleteChatDisplay);





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////              STATES              ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const greetState = new State('greet', [createChat]);
const readyState = new State('ready', [deleteChat]);

const States = [greetState, readyState];





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////                RUN               ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////





(async ()=>{
    //const db = await mongoose.dbPromise;
    
    test('decide_createChat_deleteChat: on greeting', async () => {
        const resp1 = await decide(telegram_msg_mock, States, greetState);

        expect(resp1.reply).toEqual('Greetings, '+user_mock.first_name+'!');
        expect(resp1.result.chatId).toEqual(chatId);
        expect(resp1.result.state).toEqual('ready');
    })

    test('decide_createChat_deleteChat: on \'forget me!\'', async () => {
        const resp2 = await decide(telegram_msg2_mock, States, greetState);
        
        expect(resp2.reply).toEqual('Goodbye, '+user_mock.first_name+'! I won\'t remebmer you! :(');
        expect(resp2.result.n).toEqual(1);
        expect(resp2.result.ok).toEqual(1);
        expect(resp2.result.deletedCount).toEqual(1);
    })

    //await db.disconnect();
    
})();



