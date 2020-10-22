import ChatModel, { Ichat, settingsSet, settingsKey } from "../../src/core/sheet/models/ChatModel";
import mongoose from "../../src/core/sheet/mongoose";
import sheet from "../../src/core/sheet/sheet";
import { Iquestion } from "../../src/core/sheet/models/QuestionModel";
import { questionsQuery } from "../../src/core/sheet/methods/questions/getQuestions";



////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Test data            ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


//const chatId = 231079996;
var chatId = 1729;

const args: number[] | 'all' = [2];


const settingsToSetObj: settingsSet[]
= [
    {
        'enabled': true,
        'timezone': 2,
        'asking_period_mins': 180,
        'asking_time_of_day': {
            'from_hour': 8,
            'to_hour': 20
        }
    },
    {
        'enabled': false,
        'timezone': 3,
        'asking_time_of_day': {
            'from_hour': 9,
            'to_hour': 19
        }
    },

]


type settingsKeyValueTuple<T extends settingsKey> = [T, settingsSet[T]];

const settingsToSetKeyAndValue: [settingsKey, settingsSet[settingsKey]][] = [
    ['enabled', true],
    ['timezone', 2],
    ['asking_time_of_day', {
        from_hour: 10,
        to_hour: 18
    }]
];



const questionsToAdd:
    { questionText: string,                             Tags: string[],        enabled: boolean, qid?: number}[]
 = [
    { questionText: 'Question1 Text',                   Tags: [],              enabled: false },
    { questionText: 'Question2',                        Tags: [],              enabled: false },
    { questionText: '#tag1\nQuestion3Text',             Tags: ["tag1"],        enabled: true  },
    { questionText: '#tag1 #tag2\nQuestion NUMBER four',Tags: ["tag1","tag2"], enabled: false },
    { questionText: 'question#5',                       Tags: [],              enabled: false },
    { questionText: '#tag1\nquestion №6',               Tags: ["tag1"],        enabled: true  },
    { questionText: '#tag3\nSEVENTH question',          Tags: ["tag3"],        enabled: true  },
    { questionText: 'E.I.G.H.T.H. Q',                   Tags: [],              enabled: false },
    { questionText: 'Q 9INE',                           Tags: [],              enabled: true  },
];



const getQuestionsQueries_and_Results: [NonNullable<questionsQuery>, number[]][] = [
    [{qids: [7]},                               [7]               ],
    [{qids: [7, 2 ,5]},                         [2,5,7]           ],
    [{ enabled: true },                         [3,6,7,9]         ],
    [{ enabled: false },                        [1,2,4,5,8]       ],
    [{ Tags: ["tag1"] },                        [3,4,6]           ],
    [{ Tags: ["tag1","tag3"] },                 [3,4,6,7]         ],
    [{ questionTextParts: ["ques"] },           [1,2,3,4,5,6,7]   ],
    [{ questionTextParts: ["ques","9"] },       [1,2,3,4,5,6,7,9] ],
     
    [{ Tags: ["tag1","tag3"],
       questionTextParts: ["ques", "9"] },      [3,4,6,7]         ],
       
    [{ Tags: ["tag1"],
       questionTextParts: ["text"] },           [3]               ],

    [{ enabled: false,
       Tags: ["tag1"],},                        [4]               ],

    [{ enabled: true,
       Tags: ["tag1"],},                        [3,6]             ],

    [{ qids: [7, 2, 3, 5],
       enabled: true,
       Tags: ['tag1', 'tag3'],},                [3,7]             ],

    [{ qids: [7, 2, 3, 5],
       enabled: true,
       Tags: ['tag1', 'tag3', ''],},            [3,7]             ],

    [{ qids: [7, 2, 3, 5],
       enabled: true,
       Tags: ['tag1', 'tag3', ''],
       questionTextParts: ['']},                [3,7]             ],

]



const deleteQuestionsArgs: (number | number[] | 'all')[] = [
    2,
    [3, 9, 5, 1],
    'all'
];



var DBconnection: typeof import("mongoose"),
    chatDocId: any,
    
    createChatResult: Ichat,

    getChatSettingsSingleResult_BeforeSetSettings: Ichat["Settings"][keyof Ichat["Settings"]],
    getChatSettingsAllResult_BeforeSetSettingsObj: Ichat["Settings"],
    getChatSettingsAllResult_AfterSetSettingsObj: Ichat["Settings"][] = [],
    getChatSettingsAllResult_AfterAllSetSettingsObj_BeforeAnySetSettingsKeyAndValue: Ichat["Settings"],
    getChatSettingsAllResult_AfterSetSettingsKeyAndValue: Ichat["Settings"][] = [],
    getChatSettingsAllResult_AfterAllSetSettings:  Ichat["Settings"],
    
    getChatResultBeforeAddQuestions: Ichat | null,
    getQuestionsResultsAfterAddQuestions: { questionText: string, Tags: any; }[],
    getChatResultAfterAddQuestions: Ichat | null,

    getQuestionsByQueryObjResults: Iquestion[][] = [],

    getQuestionsResultAfterDeleteQuestionsArr: Iquestion[][] = [],
    questionsToAdd_qids_exhausting: number[],
    
    deleteChatResult: { ok?: number | undefined; n?: number | undefined; } & { deletedCount?: number | undefined; };






////////////////////////////////////////////////////////
///////////                                  ///////////
/////////// Perform all queries, gather data ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


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



    ///// BEGIN TEST SETTINGS /////

    // get 'enabled' setting
    getChatSettingsSingleResult_BeforeSetSettings = await sheet.getSettings(chatId,"enabled");


    // this is to compare with the first result of setSettings with object
    getChatSettingsAllResult_BeforeSetSettingsObj
     = await sheet.getSettings(chatId);
    
    // sets new Settings with object
    for (let i = 0; i<settingsToSetObj.length; i++){
        await sheet.setSettings(chatId, settingsToSetObj[i]);
        
        getChatSettingsAllResult_AfterSetSettingsObj.push(
            await sheet.getSettings(chatId)
        );
    };

    // this is to compare with the first result of setSettings with key-value pairs
    getChatSettingsAllResult_AfterAllSetSettingsObj_BeforeAnySetSettingsKeyAndValue
     = await sheet.getSettings(chatId);

    // sets new Settings with key-value pairs 
    for (let i = 0; i<settingsToSetKeyAndValue.length; i++){
        await sheet.setSettings(chatId, 
            settingsToSetKeyAndValue[i][0], 
            settingsToSetKeyAndValue[i][1]
        );

        getChatSettingsAllResult_AfterSetSettingsKeyAndValue.push(
            await sheet.getSettings(chatId)
        );
    };

    // get all Setting after they were set
    getChatSettingsAllResult_AfterAllSetSettings =  await sheet.getSettings(chatId);

    ///// END TEST SETTINGS /////




    ///// BEGIN TEST ADD QUESTIONS /////

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

    // check questions with getQuestions and getChat
    getQuestionsResultsAfterAddQuestions = await sheet.getQuestions(chatId);
    getChatResultAfterAddQuestions = await sheet.getChat(chatId, { "_id": true, "Questions": true, "lastqid": true, "chatId": true });    

    ///// END TEST ADD QUESTIONS /////




    ///// BEGIN TEST GET QUESTIONS /////
    for (let i = 0; i<getQuestionsQueries_and_Results.length; i++){
        getQuestionsByQueryObjResults[i] = await sheet.getQuestions(chatId, getQuestionsQueries_and_Results[i][0]);
    }
    ///// END TEST GET QUESTIONS /////




    ///// BEGIN TEST DELETE QUESTIONS /////

    // defined exhausting list of qids, meaning it will be rewritten on tests
    questionsToAdd_qids_exhausting = questionsToAdd.map(e => e.qid!);

    // multiple deleteQuestion queries
    for (let i=0; i<deleteQuestionsArgs.length; i++){
        await sheet.deleteQuestions(chatId, deleteQuestionsArgs[i]);
        getQuestionsResultAfterDeleteQuestionsArr.push(await sheet.getQuestions(chatId));
    }

    ///// END TEST DELETE QUESTIONS /////
    



    // delete chat
    deleteChatResult = await sheet.deleteChat(chatId);


    return await DBconnection.disconnect();

}); // beforeAll






////////////////////////////////////////////////////////
///////////                                  ///////////
///////////        Test gathered data        ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


test('response from createNewChat() matches the data', () => {
    
    expect(createChatResult.chatId).toBe(chatId);

    expect(
        Array.isArray(createChatResult.Questions) && createChatResult.Questions.length === 0
        ||
        !createChatResult.Questions
    ).toBeTruthy();

});


test('Settings filed in newly created Chat document has correct predefined data', () => {

    expect(getChatSettingsSingleResult_BeforeSetSettings).toBe(false)

});


test('setSettings() rewrites only specified fields when passing object', () => {
    for (let i = 0; i < settingsToSetObj.length; i++) {

        if (i === 0){

            expect(JSON.stringify(
                Object.assign(
                    {},
                    getChatSettingsAllResult_BeforeSetSettingsObj,
                    settingsToSetObj[i]
                )
            )).toEqual(JSON.stringify(
                getChatSettingsAllResult_AfterSetSettingsObj[i]
            ));

        } else {

            expect(JSON.stringify(
                Object.assign(
                    {},
                    getChatSettingsAllResult_AfterSetSettingsObj[i-1],
                    settingsToSetObj[i]
                )
            )).toEqual(JSON.stringify(
                getChatSettingsAllResult_AfterSetSettingsObj[i]
            ));

        }

    }; // for i
}); // test setSettings when passing object


test('setSettings() sets a specified setting when passing a key and a value', () => {
    for (let i = 0; i < settingsToSetObj.length; i++) {

        let oneSettingObj: { [key in settingsKey]?: settingsSet[settingsKey] } = {};
        oneSettingObj[settingsToSetKeyAndValue[i][0]] = settingsToSetKeyAndValue[i][1];

        if (i === 0) {

            expect(JSON.stringify(
                Object.assign(
                    {},
                    getChatSettingsAllResult_AfterAllSetSettingsObj_BeforeAnySetSettingsKeyAndValue,
                    oneSettingObj
                )
            )).toEqual(JSON.stringify(
                getChatSettingsAllResult_AfterSetSettingsKeyAndValue[i]
            ));


        } else {

            expect(JSON.stringify(
                Object.assign(
                    {},
                    getChatSettingsAllResult_AfterSetSettingsKeyAndValue[i-1],
                    oneSettingObj
                )
            )).toEqual(JSON.stringify(
                getChatSettingsAllResult_AfterSetSettingsKeyAndValue[i]
            ));

        };

    }; // for i
}); // test setSettings when passing key-value pair





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

});



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


test('getQuestions works correctly when passing a questionsQuery object', () => {
    for (let i = 0; i < getQuestionsQueries_and_Results.length; i++) {
        expect(JSON.stringify(
            getQuestionsByQueryObjResults[i].map(q=>q.qid).sort()
        )).toEqual(JSON.stringify(
            getQuestionsQueries_and_Results[i][1].sort()
        ));
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
}); //test deleteQuestion()


test('the test chat (chatId='+chatId+') was deleted successfully', () => {
    expect(deleteChatResult.n).toBe(1);
    expect(deleteChatResult.ok).toBe(1);
    expect(deleteChatResult.deletedCount).toBe(1);
});



