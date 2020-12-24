import { IIMessage } from "../../../core/Command/Command";
import autoNextAskingTime from "../../../core/schedule/autoNextAskingTime";
import scheduleNextQuestion from "../../../core/schedule/scheduleNextQuestion";
import getSettings from "../../../core/sheet/methods/chat/getSettings";
import setChatProperty from "../../../core/sheet/methods/chat/setChatProperty";
import setSettings from "../../../core/sheet/methods/chat/setSettings";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { RequireAtLeastOne } from "../../../reusable/RequireAtLeastOne.type";


export type setAskingTime_partialArgs = {
    now:          number,
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
    console.log(`setAskingTime.execute(...)`);

    const chatId = msg.chat.id;

    const queriesResult: { 
        [A in keyof setAskingTime_partialArgs]?:
            Ichat
    } & {
        enabled?: Ichat
    } = {};
    
    const results: { 
        [A in keyof setAskingTime_partialArgs]?:
            'failed to parse' | 'failed to save' | number
    } & {
        enabled?: boolean | 'failed to save'
    } = {};


    // set DB settings in accord to requested asking interval
    if (args.interval_ms && typeof args.interval_ms === 'number') {
        console.log('\x1b[2m%s\x1b[0m','going to set Settings.asking_period_ms');
        queriesResult.interval_ms = await setSettings(chatId, {setting: "asking_period_ms", value: args.interval_ms});
        if (args.interval_ms === queriesResult.interval_ms.Settings.asking_period_ms){
            console.log('\x1b[2m%s\x1b[0m',`set Settings.asking_period_ms = ${args.interval_ms}`);
            results.interval_ms = args.interval_ms;
        } else {
            console.log('\x1b[2m%s\x1b[0m','failed to set Settings.asking_period_ms');
            results.interval_ms = 'failed to save';
        }
    } else if (args.interval_ms === 'matched by a matchTree but failed to parse') {
        console.log('\x1b[2m%s\x1b[0m','failed to parse Settings.asking_period_ms');
        results.interval_ms = 'failed to parse';
    }

    // set DB settings in accord to requested next question time
    if (args.next_unix   && typeof args.next_unix   === 'number') {
        console.log('\x1b[2m%s\x1b[0m','going to set next_question');
        // queriesResult.next_unix = await setScheduledAsk(chatId, new Date(args.next_unix));
        queriesResult.next_unix = await setChatProperty(chatId, {property: "next_question", value: new Date(args.next_unix)});
        if (args.next_unix === queriesResult.next_unix.next_question?.getTime()){
            console.log('\x1b[2m%s\x1b[0m',`set next_question = ${args.next_unix}`);
            results.next_unix = args.next_unix;
        } else {
            console.log('\x1b[2m%s\x1b[0m','failed to set next_question');
            results.next_unix = 'failed to save';
        }

    } else if (args.next_unix === 'matched by a matchTree but failed to parse') {
        console.log('\x1b[2m%s\x1b[0m','failed to parse next_question');
        results.next_unix = 'failed to parse';
    }
    
    // set DB settings in accord to requested asking time of day (from)
    if (args.from        && typeof args.from        === 'number') {
        console.log('\x1b[2m%s\x1b[0m','going to set Settings.asking_timeOfDay_from');
        queriesResult.from =        await setSettings(chatId, {setting: "asking_timeOfDay_from", value: args.from});
        if (args.from === queriesResult.from.Settings.asking_timeOfDay_from) {
            console.log('\x1b[2m%s\x1b[0m',`set Settings.asking_timeOfDay_from=${args.from}`);
            results.from = args.from;
        } else {
            console.log('\x1b[2m%s\x1b[0m','failed to set Settings.asking_timeOfDay_from');
            results.from = 'failed to save';
        }
    } else if (args.from === 'matched by a matchTree but failed to parse') {
        console.log('\x1b[2m%s\x1b[0m','failed to parse Settings.asking_timeOfDay_from');
        results.from = 'failed to parse';
    }

    // set DB settings in accord to requested asking time of day (to)
    if (args.to          && typeof args.to          === 'number') {
        console.log('\x1b[2m%s\x1b[0m','going to set Settings.asking_timeOfDay_to');
        queriesResult.to =          await setSettings(chatId, {setting: "asking_timeOfDay_to", value: args.to});
        if (args.to === queriesResult.to.Settings.asking_timeOfDay_to) {
            console.log('\x1b[2m%s\x1b[0m',`set Settings.asking_timeOfDay_to=${args.to}`);
            results.to = args.to;
        } else {
            console.log('\x1b[2m%s\x1b[0m','failed to set Settings.asking_timeOfDay_to');
            results.to = 'failed to save';
        }
    } else if (args.from === 'matched by a matchTree but failed to parse') {
        console.log('\x1b[2m%s\x1b[0m','failed to parse Settings.asking_timeOfDay_to');
        results.from = 'failed to parse';
    }


    if (typeof results.next_unix === 'number') {
        console.log('\x1b[2m%s\x1b[0m','going to scheduleNextQuestion by given next_unix number');
        scheduleNextQuestion(chatId, new Date(results.next_unix));

    } else if (typeof results.interval_ms === 'number') {
        const settings = await getSettings(chatId);
        if (settings.enabled && settings.asking_period_ms && settings.asking_timeOfDay_from && settings.asking_timeOfDay_to){
            results.next_unix = autoNextAskingTime({
                now: new Date(args.now),
                interval_ms: results.interval_ms,
                asking_timeOfDay_from: settings.asking_timeOfDay_from,
                asking_timeOfDay_to: settings.asking_timeOfDay_to,
            });
            queriesResult.next_unix = await setChatProperty(chatId, { property: "next_question", value: new Date(results.next_unix) });

            // if was saved properly
            if (results.next_unix === queriesResult.next_unix.next_question?.getTime()) {
                console.log('\x1b[2m%s\x1b[0m','going to scheduleNextQuestion by given interval');
                scheduleNextQuestion(chatId, new Date(results.next_unix));
            } else {
                results.next_unix = 'failed to save';
            }
        }
    }


    queriesResult.enabled = await setSettings(chatId, { setting: "enabled", value: true });
    results.enabled = queriesResult.enabled.Settings.enabled === true ? true : 'failed to save';
    

    return {
        request: args,
        response: results,
    };

}
