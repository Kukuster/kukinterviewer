import mongoose, { Mongoose } from "../../src/core/sheet/mongoose";
import models from "../../src/core/sheet/models";
import { Ichat } from "../../src/core/sheet/models/ChatModel";

const ij = process.env.NODE_ENV === 'test'

ij && jest.setTimeout(20000);

const chatId = 231079996

ij && beforeAll(async ()=>{
    // console.log('executing beforeAll');
    return await mongoose.dbPromise;
})

ij && afterAll(async ()=>{
    // console.log('executing afterAll');
    const disconnect = await (await mongoose.dbPromise).disconnect();
    return disconnect;
})

/**
 * 
 * @example
 * getChat.then( (result)=>{.....} ).catch( (e)=>{.....} )
 * 
 * @param chatId id of a Telegram Chat
 * @return {Promise<Ichat[]>}
 */
function getChat(chatId: number): Promise<Ichat[]> {
    const reqPromise = models.ChatModel.find({ chatId: chatId }).exec()
    return reqPromise;
}


ij ? (
    test('getChat', done => {
        getChat(chatId).then((result) => {
            expect(result).toBe(result);
            // console.log(result);
            // console.log('before "done()"');
            done();
        }).catch((error) => {
            // console.error(error);
        })
        // console.log('after defining getChat test, but before getting the results');
    })
) : (
    getChat(chatId).then((result) => {
        // console.log(result);
        
    }).catch((error) => {
        // console.error(error);
    })
)



