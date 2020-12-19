import { IIMessage } from "../../../core/Command/Command";
import setChatProperty from "../../../core/sheet/methods/chat/setChatProperty";
import setScheduledAsk from "../../../core/sheet/methods/chat/setScheduledAsk";
import setSettings from "../../../core/sheet/methods/chat/setSettings";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { RequireAtLeastOne } from "../../../reusable/RequireAtLeastOne.type";


export type setAskingTime_partialArgs = {
    interval_ms?: number | 'matched by a matchTree but failed to parse',
    next_unix?:   number | 'matched by a matchTree but failed to parse',
    from?:        number | 'matched by a matchTree but failed to parse',
    to?:          number | 'matched by a matchTree but failed to parse',
}

export type setAskingTime_args = RequireAtLeastOne<{
    [K in keyof setAskingTime_partialArgs]:
       string extends K ? undefined : number
}>;


export default async function setAskingTime_execute(msg: IIMessage, args: setAskingTime_partialArgs) {

    const chatId = msg.chat.id;

    const queriesResult: { 
        [A in keyof setAskingTime_partialArgs]?:
            Ichat
    } & {
        enabled?: Ichat
    } = {}
    
    const results: { 
        [A in keyof setAskingTime_partialArgs]?:
            'failed to parse' | 'failed to save' | number
    } & {
        enabled?: boolean | 'failed to save'
    } = {}


    
    if (args.interval_ms && typeof args.interval_ms === 'number') {
        queriesResult.interval_ms = await setSettings(chatId, {setting: "asking_period_ms", value: args.interval_ms});
        if (args.interval_ms === queriesResult.interval_ms.Settings.asking_period_ms){
            results.interval_ms = args.interval_ms;
        } else {
            results.interval_ms = 'failed to save';
        }
    } else if (args.interval_ms === 'matched by a matchTree but failed to parse') {
        results.interval_ms = 'failed to parse';
    }


    if (args.next_unix   && typeof args.next_unix   === 'number') {
        // queriesResult.next_unix = await setScheduledAsk(chatId, new Date(args.next_unix));
        queriesResult.next_unix = await setChatProperty(chatId, {property: "next_question", value: new Date(args.next_unix)});
        if (args.next_unix === queriesResult.next_unix.next_question?.getTime()){
            results.next_unix = args.next_unix;
        } else {
            results.next_unix = 'failed to save';
        }

    } else if (args.next_unix === 'matched by a matchTree but failed to parse') {
        results.next_unix = 'failed to parse';
    }
    

    if (args.from        && typeof args.from        === 'number') {
        queriesResult.from =        await setSettings(chatId, {setting: "asking_timeOfDay_from", value: args.from});
        if (args.from === queriesResult.from.Settings.asking_timeOfDay_from) {
            results.from = args.from;
        } else {
            results.from = 'failed to save';
        }
    } else if (args.from === 'matched by a matchTree but failed to parse') {
        results.from = 'failed to parse';
    }


    if (args.to          && typeof args.to          === 'number') {
        queriesResult.to =          await setSettings(chatId, {setting: "asking_timeOfDay_to", value: args.to});
        if (args.to === queriesResult.to.Settings.asking_timeOfDay_to) {
            results.to = args.to;
        } else {
            results.to = 'failed to save';
        }
    } else if (args.from === 'matched by a matchTree but failed to parse') {
        results.from = 'failed to parse';
    }


    queriesResult.enabled = await setSettings(chatId, { setting: "enabled", value: true });
    results.enabled = queriesResult.enabled.Settings.enabled === true ? true : 'failed to save';
    

    return {
        request: args,
        response: results,
    };

}
