import { IIMessage } from "../../../bot/botlib";
import autoNextAskingTime from "../../../core/schedule/autoNextAskingTime";
import scheduleNextQuestion from "../../../core/schedule/scheduleNextQuestion";
import getSettings from "../../../core/sheet/methods/chat/getSettings";
import setChatProperty from "../../../core/sheet/methods/chat/setChatProperty";
import setSettings from "../../../core/sheet/methods/chat/setSettings";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import { convertFromTZ, convertTimeOfDayFromTZ } from "../../../reusable/datetime";



export type setAskingTime_prepareReturn = {
    now: number,

    interval_ms?: {
        index_left: number,
        index_right: number,
    } | {
        regularly: true
    } | undefined,

    from?: {
        index_left: number,
        index_right: number,
        shiftByTimezone?: boolean
    } | undefined,

    to?: {
        index_left: number,
        index_right: number,
        shiftByTimezone?: boolean,
    } | undefined,

    next_unix?: {
        index_left: number,
        index_right: number,
        shiftByTimezone?: boolean,
    } | undefined,
};


export type setAskingTime_partialArgs = {
    now:          {
        datetime: number,
        shiftByTimezone?: boolean,
    }
    interval?: {
        interval_ms: number | 'matched by a matchTree but failed to parse',
    },
    next_unix?:   {
        datetime: number | 'matched by a matchTree but failed to parse' | 'mentioned datetime is in the past',
        shiftByTimezone?: boolean,
    }
    from?:        {
        datetime: number | 'matched by a matchTree but failed to parse',
        shiftByTimezone?: boolean,
    }
    to?:          {
        datetime: number | 'matched by a matchTree but failed to parse',
        shiftByTimezone?: boolean,
    }

};


export type setAskingTime_result = {
    interval_ms?: number | 'failed to parse' | 'failed to save',
    next_unix?:   number | 'failed to parse' | 'failed to save',
    from?:        number | 'failed to parse' | 'failed to save',
    to?:          number | 'failed to parse' | 'failed to save',
    enabled?:     boolean | 'failed to save',
    timezone?:    string;
}



export type setAskingTime_execute_return = {
    request: setAskingTime_partialArgs;
    response: setAskingTime_result;
};


export default async function setAskingTime_execute(msg: IIMessage, args: setAskingTime_partialArgs | null)
    : Promise<setAskingTime_execute_return | null>
{
    if (args === null){
        return null;
    }

    const chatId = msg.chat.id;

    const queriesResult: { 
        [A in keyof setAskingTime_partialArgs]?:
            Ichat
    } & {
        enabled?: Ichat
    } = {};
    
    const results: setAskingTime_result = {};
    
    const timezone = await getSettings(chatId, 'timezone');
    
    results.timezone = timezone;


    // set DB settings in accord to requested asking interval
    if (args.interval && typeof args.interval.interval_ms === 'number') {
        queriesResult.interval = await setSettings(chatId, {setting: "asking_period_ms", value: args.interval.interval_ms});
        if (args.interval.interval_ms === queriesResult.interval.Settings.asking_period_ms) {
            results.interval_ms = args.interval.interval_ms;
        } else {
            results.interval_ms = 'failed to save';
        }
    } else if (args.interval?.interval_ms === 'matched by a matchTree but failed to parse') {
        results.interval_ms = 'failed to parse';
    }


    // set DB settings in accord to requested next question time
    if (args.next_unix   && typeof args.next_unix.datetime === 'number') {
        if (args.next_unix.shiftByTimezone && timezone){
            args.next_unix.datetime = convertFromTZ(new Date(args.next_unix.datetime), timezone).getTime();
        }
        // queriesResult.next_unix = await setScheduledAsk(chatId, new Date(args.next_unix));
        queriesResult.next_unix = await setChatProperty(chatId, {property: "next_question", value: new Date(args.next_unix.datetime)});
        if (args.next_unix.datetime === queriesResult.next_unix.next_question?.getTime()){
            results.next_unix = args.next_unix.datetime;
        } else {
            results.next_unix = 'failed to save';
        }

    } else if (args.next_unix?.datetime === 'matched by a matchTree but failed to parse') {
        results.next_unix = 'failed to parse';
    }
    

    // set DB settings in accord to requested asking time of day (from)
    if (args.from        && typeof args.from.datetime === 'number') {
        if (args.from.shiftByTimezone && timezone) {
            args.from.datetime = convertTimeOfDayFromTZ(new Date(args.from.datetime), timezone);
        }
        queriesResult.from = await setSettings(chatId, {setting: "asking_timeOfDay_from", value: args.from.datetime});
        if (args.from.datetime === queriesResult.from.Settings.asking_timeOfDay_from) {
            results.from = args.from.datetime;
        } else {
            results.from = 'failed to save';
        }
    } else if (args.from?.datetime === 'matched by a matchTree but failed to parse') {
        results.from = 'failed to parse';
    }


    // set DB settings in accord to requested asking time of day (to)
    if (args.to          && typeof args.to.datetime === 'number') {
        if (args.to.shiftByTimezone && timezone) {
            args.to.datetime = convertTimeOfDayFromTZ(new Date(args.to.datetime), timezone);
        }
        queriesResult.to = await setSettings(chatId, {setting: "asking_timeOfDay_to", value: args.to.datetime});
        if (args.to.datetime === queriesResult.to.Settings.asking_timeOfDay_to) {
            results.to = args.to.datetime;
        } else {
            results.to = 'failed to save';
        }
    } else if (args.to?.datetime === 'matched by a matchTree but failed to parse') {
        results.from = 'failed to parse';
    }


    // schedule next question and set next asking time to DB
    // either in accord to requested "next asking time"
    // or automatically based on the asking interval and asking time of day
    if (typeof results.next_unix === 'number') {
        scheduleNextQuestion(chatId, new Date(results.next_unix));
    } else if (typeof results.interval_ms === 'number') {
        const settings = await getSettings(chatId);
        if (settings.enabled && settings.asking_period_ms && settings.asking_timeOfDay_from && settings.asking_timeOfDay_to){
            results.next_unix = autoNextAskingTime({
                now: new Date(args.now.datetime),
                interval_ms: results.interval_ms,
                asking_timeOfDay_from: settings.asking_timeOfDay_from,
                asking_timeOfDay_to: settings.asking_timeOfDay_to,
            });
            queriesResult.next_unix = await setChatProperty(chatId, { property: "next_question", value: new Date(results.next_unix) });

            // if was saved properly
            if (results.next_unix === queriesResult.next_unix.next_question?.getTime()) {
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
