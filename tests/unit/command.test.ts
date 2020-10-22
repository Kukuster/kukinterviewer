import Command, { IIMessage } from "../../src/core/Command/Command";
import default_match   from "../../src/core/Command/default_methods/match";
import default_prepare from "../../src/core/Command/default_methods/prepare";
import default_execute from "../../src/core/Command/default_methods/execute";
import default_display from "../../src/core/Command/default_methods/display";
import { Message } from "node-telegram-bot-api";


const dummyMatch = async function (this: Command<any,any,any>, msg: IIMessage) {
    //msg.text.match('');

    return new Promise<RegExpMatchArray|null>((resolve, reject) => {
        let match = 'somestring'.match(/some/);
        //console.log(this.prepare);
        resolve(match);

    });
};

const dummyPrepare = async function (this: Command<any,any,any>, msg: IIMessage, match: RegExpMatchArray) {
    //msg.text;

    return new Promise<object>((resolve, reject) => {
        resolve({kek: 'lel'});
    });
};

const dummyExecute = async function (this: Command<any,any,any>, msg: IIMessage, args: object) {
    //msg.text;

    return new Promise<string>((resolve, _) => {
        resolve(<string>JSON.stringify({}));
    });
};

const dummyDisplay = async function (this: Command<any,any,any>, msg: IIMessage, response: string) {
    //msg.text;

    const chatId = msg.chat.id;
    console.log(JSON.stringify(response, null, 2));

    return new Promise<string>((resolve, _) => {
        resolve(response);
    });
};


const dummyCommand2 = new Command(dummyMatch, dummyPrepare, dummyExecute, dummyDisplay);

test('Command, custom_methods -> ', () => {
    expect(dummyCommand2.match)  .toBe(dummyMatch);
    expect(dummyCommand2.prepare).toBe(dummyPrepare);
    expect(dummyCommand2.execute).toBe(dummyExecute);
    expect(dummyCommand2.display).toBe(dummyDisplay);
});



const telegram_msg_mock: Message = {
    text: '',
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 444444444,
        type: 'private'
    }

};


test('Command, custom command run', async (done) => {
    const match = await dummyCommand2.match(telegram_msg_mock);
    if (!match) { return; }
    const args  = await dummyCommand2.prepare(telegram_msg_mock, match);
    const resp  = await dummyCommand2.execute(telegram_msg_mock, args);
    const _     = await dummyCommand2.display(telegram_msg_mock, resp);
    done();
    return;
});

