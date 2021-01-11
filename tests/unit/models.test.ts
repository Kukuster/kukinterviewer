import { DBconnection } from "../../src/core/sheet/mongoose";
import models from "../../src/core/sheet/models";
import { Ichat } from "../../src/core/sheet/models/ChatModel";

const chatId = 231079996;

beforeAll(async () => {
    return await DBconnection;
});

afterAll(async () => {
    const disconnect = await (await DBconnection).disconnect();
    return disconnect;
});

/**
 * 
 * @example
 * getChat.then( (result)=>{.....} ).catch( (e)=>{.....} )
 * 
 * @param chatId id of a Telegram Chat
 * @return {Promise<Ichat[]>}
 */
function getChat(chatId: number): Promise<Ichat[]> {
    const reqPromise = models.ChatModel.find({ chatId: chatId }).exec();
    return reqPromise;
}


test('a function using mongoose models and mongoose connection', done => {
    getChat(chatId).then((result) => {
        expect(result).toBe(result);
        done();
    });
});



