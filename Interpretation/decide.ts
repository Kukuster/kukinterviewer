import { IIMessage } from "../core/Command/Command";
import State from "../core/State/State";
import ChatModel from "../core/sheet/models/ChatModel";


export async function decide(message: IIMessage, States: State[], defaultState: State){
    const chatId = message.chat.id;
    
    const result = await ChatModel.find({ chatId: chatId }).select({ "state": true, "_id": false }).exec();

    let theState: State | undefined;
    

    if (!result.length){ 
        theState = defaultState;

    } else {
        if (!result[0].state){
            console.error(new Error('ERROR while getting chat state. Got chat document object, but it has no *state* property'));
            return;
        }

        theState = States.find(s => s.name === result[0].state);

        if (!theState){
            theState = defaultState;
        }

    }

    //given the state, deciding on which command the message matches

    for (const i in theState.Commands){
        let match;
        if ( match     = await theState.Commands[i].match  (message)){
            const args = await theState.Commands[i].prepare(message, match);
            const resp = await theState.Commands[i].execute(message, args);
                  return await theState.Commands[i].display(message, resp);
        }

    }


}

