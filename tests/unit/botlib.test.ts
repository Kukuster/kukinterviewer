import { is_TTChatType, is_IIChat, is_IIUser, is_IIMessage } from "../../src/bot/botlib";

////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Test data            ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////

const TestedChatTypes = [
    'private',  // #0  V
    'group',    // #1  V
    'superman', // #2  X
] as const;

const TestedChatTypes_expectedResults = [
    true,  // #0
    true,  // #1
    false, // #2
] as const;


const TestedIIChats = [
    { id: 10,    type: 'private' },  // #0  V
    { id: '0',   type: 'private' },  // #1  X
    { id: 100,   type: 'group'   },  // #2  V
    { id: null,  type: 'group'   },  // #3  X
    { id: 32362, type: 'superman'},  // #4  X
    { id: 32362, type: 'private' },  // #5  V
] as const;

const TestedIIChats_expectedResults = [
    true,  // #0
    false, // #1
    true,  // #2
    false, // #3
    false, // #4
    true,  // #5
] as const;


const TestedIIUsers = [
    // #0  V
    {
        id: 10,
        first_name: 'John',
        is_bot: true,
    },
    // #1  X
    {
        id: 15,
        first_name: 'Kukuster',
        is_bot: 'false',
    },
    // #2  V
    {
        id: 25,
        first_name: 'John',
        is_bot: false,
    },
    // #3  V
    {
        id: 30,
        first_name: 'Kukuster',
        is_bot: false,
    },
    // #4  X
    {
        id: '30',
        first_name: 'Kukuster',
        is_bot: false,
    },
    // #5  X
    {
        id: 30,
        first_name: {name: 'first'},
        is_bot: false,
    },
] as const;

const TestedIIUsers_expectedResults = [
    true,    // #0
    false,   // #1
    true,    // #2
    true,    // #3
    false,   // #4
    false,   // #5
] as const;


const TestedIIMessages = [
    // #0  V
    {
        message_id: 10,
        from: TestedIIUsers[0],
        date: 100000000,
        chat: TestedIIChats[0],
    },
    // #1  X
    {
        message_id: 10,
        from: TestedIIUsers[0],
    },
    // #2  X
    {
        message_id: '10',
        from: TestedIIUsers[0],
        date: 100000000,
        chat: TestedIIChats[0],
    },
    // #3  X
    {
        message_id: 10,
        from: TestedIIUsers[1],
        date: 100000000,
        chat: TestedIIChats[0],
    },
    // #4  X
    {
        message_id: 10,
        from: TestedIIUsers[0],
        date: '100000000',
        chat: TestedIIChats[0],
    },
    // #5  X
    {
        message_id: 10,
        from: TestedIIUsers[0],
        date: 100000000,
        chat: TestedIIChats[1],
    },
    // #6  V
    {
        message_id: 50,
        from: TestedIIUsers[2],
        date: 600000000,
        chat: TestedIIChats[5],
    },
    // #7  V
    {
        message_id: 50,
        date: 600000000,
        chat: TestedIIChats[5],
    },
    // #8  X
    {
        message_id: 50,
        from: TestedIIUsers[1],
        date: 600000000,
        chat: TestedIIChats[5],
    },
] as const;

const TestedIIMessages_expectedResults = [
    true,    // #0
    false,   // #1
    false,   // #2
    false,   // #3
    false,   // #4
    false,   // #5
    true,    // #6
    true,    // #7
    false,   // #8
] as const;




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////   Tested calculations & results  ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////




for (let i = 0; i < TestedChatTypes.length; i++){
    test(`is_TTChatType(TestedChatTypes[${i}]) === ${TestedChatTypes_expectedResults[i]}`, () => {
        expect(is_TTChatType(TestedChatTypes[i])).toBe(TestedChatTypes_expectedResults[i]);
    });
}


for (let i = 0; i < TestedIIChats.length; i++) {
    test(`is_IIChat(TestedIIChats[${i}]) === ${TestedIIChats_expectedResults[i]}`, () => {
        expect(is_IIChat(TestedIIChats[i])).toBe(TestedIIChats_expectedResults[i]);
    });
}


for (let i = 0; i < TestedIIUsers.length; i++) {
    test(`is_IIUser(TestedIIUsers[${i}]) === ${TestedIIUsers_expectedResults[i]}`, () => {
        expect(is_IIUser(TestedIIUsers[i])).toBe(TestedIIUsers_expectedResults[i]);
    });
}


for (let i = 0; i < TestedIIMessages.length; i++) {
    test(`is_IIMessage(TestedIIMessages[${i}]) === ${TestedIIMessages_expectedResults[i]}`, () => {
        expect(is_IIMessage(TestedIIMessages[i])).toBe(TestedIIMessages_expectedResults[i]);
    });
}


