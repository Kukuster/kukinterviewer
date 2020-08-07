import ChatModel, { Ichat } from "../../core/sheet/models/ChatModel";
import mongoose from "../../core/sheet/mongoose";
import sheet from "../../core/sheet/sheet";
import getChat from "../../core/sheet/methods/chat/getChat";
import { Iquestion } from "../../core/sheet/models/QuestionModel";
import deleteQuestions from "../../core/sheet/methods/questions/deleteQuestions";

//const chatId = 231079996;
var chatId = 1729;

const args: number[] | 'all' = [2];


const questionsToAdd:
    { questionText: string,                         Tags: string[], qid?: number}[]
 = [
    { questionText: 'Question1 Text',               Tags: [] },
    { questionText: 'Question2',                    Tags: [] },
    { questionText: '#third\nQuestion3Text',        Tags: ["#third"] },
    { questionText: 'Question NUMBER four',         Tags: [] },
    { questionText: 'question#5',                   Tags: [] },
    { questionText: 'question №6',                  Tags: [] },
    { questionText: 'SEVENTH question',             Tags: [] },
    { questionText: 'E.I.G.H.T.H. Q',               Tags: [] },
    { questionText: 'Q 9INE',                       Tags: [] },
];



const deleteQuestionsArgs: (number | number[] | 'all')[] = [
    2,
    [3, 9, 5, 1],
    'all'
];



var DBconnection: typeof import("mongoose"),
    chatDocId: any,
    
    createChatResult: Ichat,
    
    getChatResultBeforeAddQuestions: Ichat | null,
    getQuestionsResultsAfterAddQuestions: { questionText: string, Tags: any; }[],
    getChatResultAfterAddQuestions: Ichat | null,

    getQuestionsResultAfterDeleteQuestionsArr: Iquestion[][] = [],
    questionsToAdd_qids_exhausting: number[],
    
    deleteChatResult: { ok?: number | undefined; n?: number | undefined; } & { deletedCount?: number | undefined; };



beforeAll(async () => {

    DBconnection = await mongoose.dbPromise;

    // find unused chatId
    try{
        while (await sheet.hasChat(chatId)){
            chatId++;
        }
    } catch (e){
        console.error('Error while trying to check if there\'s a chat with chatId='+chatId);
        console.error(e);
    }

    // create new chat
    createChatResult = await sheet.createNewChat(chatId);
    // remember this mongoDB document ID of this chat
    chatDocId = createChatResult._id;

    // getChat
    getChatResultBeforeAddQuestions = await sheet.getChat(chatId, { "_id": true, "Questions": true, "lastqid": true, "Settings": true });


    // adding questions
    for (let i = 0; i < questionsToAdd.length; i++) {
        await sheet.addQuestion(chatId, questionsToAdd[i]);
    }


    // add proper qids to the test data in order to compare later
    for (let i = 0; i < questionsToAdd.length; i++) {
        questionsToAdd[i].qid = i+1;
    }


    // defined exhausting list of qids, meaning it will be rewritten on tests
    questionsToAdd_qids_exhausting = questionsToAdd.map(e => e.qid!);


    // check questions with getQuestions and getChat
    getQuestionsResultsAfterAddQuestions = await sheet.getQuestions(chatId);
    getChatResultAfterAddQuestions = await sheet.getChat(chatId, { "_id": true, "Questions": true, "lastqid": true, "chatId": true });    


    // multiple deleteQuestion queries
    for (let i=0; i<deleteQuestionsArgs.length; i++){
        await sheet.deleteQuestions(chatId, deleteQuestionsArgs[i]);
        getQuestionsResultAfterDeleteQuestionsArr.push(await sheet.getQuestions(chatId));
    }
    

    // delete chat
    deleteChatResult = await sheet.deleteChat(chatId);


    return await DBconnection.disconnect();

}); // beforeAll



test('response from createNewChat() matches the data', () => {
    
    expect(createChatResult.chatId).toBe(chatId);

    expect(
        Array.isArray(createChatResult.Questions) && createChatResult.Questions.length === 0
        ||
        !createChatResult.Questions
    ).toBeTruthy();

});


test('data from getChat() matches the data used on createNewChat()', () => {

    expect(getChatResultBeforeAddQuestions?.chatId).toBeFalsy();

    expect(
        JSON.stringify(getChatResultBeforeAddQuestions?._id)
    ).toEqual(
        JSON.stringify(chatDocId)
    );

    expect(
        JSON.stringify(getChatResultBeforeAddQuestions?.Questions)
    ).toEqual(
        JSON.stringify(createChatResult.Questions)
    );

})

test('questions were correctly created with addQuestion(), and data from getChat() and getQuestions(\'all\') match with each other and with previous data', () => {
    expect(
        JSON.stringify(getQuestionsResultsAfterAddQuestions)
    ).toBe(
        JSON.stringify(getChatResultAfterAddQuestions?.Questions)
    );

    expect(getChatResultAfterAddQuestions?.chatId).toBe(chatId);
    
    expect(
        JSON.stringify(getChatResultAfterAddQuestions?._id)
    ).toBe(
        JSON.stringify(chatDocId)
    );

    for (let i = 0; i < questionsToAdd.length; i++) {
        expect(getQuestionsResultsAfterAddQuestions[i].questionText).toBe(questionsToAdd[i].questionText);
        expect(
            JSON.stringify(getQuestionsResultsAfterAddQuestions[i].Tags)
        ).toEqual(
            JSON.stringify(questionsToAdd[i].Tags)
        );
    }

});


test('deleteQuestion() works correctly with variety of supported types of arguments', () => {

    for (let i = 0; i < deleteQuestionsArgs.length; i++) {

        const deleteQuestionsArgs_i = deleteQuestionsArgs[i];
        
        if (Array.isArray(deleteQuestionsArgs_i)){
            
            expect(JSON.stringify(
                getQuestionsResultAfterDeleteQuestionsArr[i].map(e=>e.qid)
            )).toEqual(JSON.stringify(
                questionsToAdd_qids_exhausting = questionsToAdd_qids_exhausting.filter(value => !deleteQuestionsArgs_i.includes(value!))
            ));

        } else if (typeof deleteQuestionsArgs_i === 'number') {

            expect(JSON.stringify(
                getQuestionsResultAfterDeleteQuestionsArr[i].map(e => e.qid)
            )).toEqual(JSON.stringify(
                questionsToAdd_qids_exhausting = questionsToAdd_qids_exhausting.filter(value => deleteQuestionsArgs_i !== value!)
            ));

        } else if (deleteQuestionsArgs_i === 'all') {

            expect(JSON.stringify(
                getQuestionsResultAfterDeleteQuestionsArr[i].map(e => e.qid)
            )).toEqual(JSON.stringify(
                []
            ));

        }

    } // for i
    
});


test('the test chat (chatId='+chatId+') was deleted successfully', () => {
    expect(deleteChatResult.n).toBe(1);
    expect(deleteChatResult.ok).toBe(1);
    expect(deleteChatResult.deletedCount).toBe(1);
});



