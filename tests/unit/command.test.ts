import { IIMessage } from "../../src/bot/botlib";
import Command from "../../src/core/Command/Command";


////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Test data            ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const telegram_msg_mock: IIMessage = {
    text: '',
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 444444444,
        type: 'private'
    }

};

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

    return new Promise<Record<string, any>>((resolve, reject) => {
        resolve({kek: 'lel'});
    });
};

const dummyExecute = async function (this: Command<any,any,any>, msg: IIMessage, args: Record<string, any>) {
    //msg.text;

    return new Promise<string>((resolve, _) => {
        resolve(<string>JSON.stringify({}));
    });
};

const dummyDisplay = async function (this: Command<any,any,any>, msg: IIMessage, response: string) {
    //msg.text;

    const chatId = msg.chat.id;
    // console.log(JSON.stringify(response, null, 2));

    return new Promise<string>((resolve, _) => {
        resolve(response);
    });
};


const dummyCommand = new Command(dummyMatch, dummyPrepare, dummyExecute, dummyDisplay);




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////   Tested calculations & results  ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////



test('Command is constructed properly with its methods', () => {
    expect(dummyCommand.match)  .toBe(dummyMatch);
    expect(dummyCommand.prepare).toBe(dummyPrepare);
    expect(dummyCommand.execute).toBe(dummyExecute);
    expect(dummyCommand.display).toBe(dummyDisplay);
});


test('Command methods run properly', async (done) => {
    const match = await dummyCommand.match(telegram_msg_mock);
    if (!match) { return; }
    const args  = await dummyCommand.prepare(telegram_msg_mock, match);
    const resp  = await dummyCommand.execute(telegram_msg_mock, args);
    const _     = await dummyCommand.display(telegram_msg_mock, resp);
    done();
    return;
});

