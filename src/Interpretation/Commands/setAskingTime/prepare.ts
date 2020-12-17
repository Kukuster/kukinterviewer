import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { setAskingTime_partialArgs } from "./execute";
import { shoot } from "./matchTree";
import { getTimeWithoutDate, timeUnitsVocabulary } from "../../../reusable/datetime";
import roundBy from "../../../reusable/roundBy";
import { extractDatetime_fromPassedTree, extractDuration_fromPassedTree } from "../../matchTree/extras/time";



export default async function setAskingTime_prepare (msg: IIMessage, path: treeStep[]): Promise<any>  {
    console.log(`setAskingTime.prepare(...)`);

    const theShoot: shoot = path[path.length - 1].shoot;

    const path_len = path.length;

    const message = msg.text!;

    const request: setAskingTime_partialArgs = {};

    const maybe: { [K in keyof setAskingTime_partialArgs]: Date | number | string } = {};
    
    let to_time: number | undefined = 0,  to_meridiem: number | undefined = 0,
        at_time: number | undefined = 0,  at_meridiem: number | undefined = 0,
      from_time: number | undefined = 0,from_meridiem: number | undefined = 0,
        interval_amount: number | undefined, interval_timeunit: number | undefined, interval_adverb: number | undefined, interval_regularly: number | undefined;

    const timeLocale = "en-US";
    const timeZone = 'UTC';

    const now = new Date(roundBy(msg.date, 1000));

    let gotDate: number | null;
    let gotInterval: number | null;
    let regularly: number | undefined;

    let atDateTime_words: number[] = [];

    let interval_words: number[] = [];

    
    for (let i = 0; i < path_len; i++){
        const nd = path[i];
        const shoot = nd.shoot as shoot;
        

        if        (shoot === 'to (time)') {
            to_time = i;

        } else if (shoot === 'to (meridiem)') {
            to_meridiem = i;

        } else if (shoot === 'from (time)') {
            from_time = i;

        } else if (shoot === 'from (meridiem)') {
            from_meridiem = i;


        } else if (shoot === 'at (time)') {
            at_time = i;

        } else if (shoot === 'at (meridiem)') {
            at_meridiem = i;

        } else if (shoot === 'at - a datetime word') {
            // saves the last sequence of adjacent "at time" words
            if (
                !atDateTime_words.length ||
                atDateTime_words[atDateTime_words.length - 1] === i - 1
            ) {
                // if array is empty, or the last element of array is the previous path index
                atDateTime_words.push(i);
            } else {
                // if a new "at" substring has been detected, overwrite previous one
                atDateTime_words = [i];
            }

        } else if (shoot === 'interval (amount)' || shoot === 'interval (timeunit)' || shoot === 'interval (adverb)' || shoot === 'interval word') {
            if (
                !interval_words.length ||
                interval_words[interval_words.length - 1] === i - 1
            ) {

                interval_words.push(i);
            } else {
                interval_words = [i];
            }
        
        } else if (shoot === 'interval "regularly"') {
            regularly = i;
        }


    }


    if (to_time) {
        if (to_meridiem) {
            gotDate = extractDatetime_fromPassedTree(path, message, to_time, to_meridiem, now);
            if (gotDate) { 
                request.to = getTimeWithoutDate(gotDate);
            }
        } else {
            gotDate = extractDatetime_fromPassedTree(path, message, to_time, to_time, now);
            if (gotDate) {
                request.to = getTimeWithoutDate(gotDate);
            }
        }
    }
    if (from_time) {
        if (from_meridiem) {
            gotDate = extractDatetime_fromPassedTree(path, message, from_time, from_meridiem, now);
            if (gotDate) {
                request.from = getTimeWithoutDate(gotDate);
            }
        } else {
            gotDate = extractDatetime_fromPassedTree(path, message, from_time, from_time, now);
            if (gotDate) {
                request.from = getTimeWithoutDate(gotDate);
            }
        }
    }

    if (atDateTime_words.length) {
        gotDate = extractDatetime_fromPassedTree(path, message, atDateTime_words[0], atDateTime_words[atDateTime_words.length - 1], now);
        if (gotDate) {
            request.next_unix = gotDate;
        }
    }

    if (interval_words.length) {
        gotInterval = extractDuration_fromPassedTree(path, message, interval_words[0], interval_words[interval_words.length - 1]);
        if (gotInterval) {
            request.interval_ms = gotInterval;
        }
    } else {
        if (regularly) {
            request.interval_ms = timeUnitsVocabulary.days;
        }
    }

    console.log({
        message,
        path,
        interval_words,
        from_time,
        to_time,
        atDateTime_words,
        request,
    });

    // console.log({
    //     message,
    //     path,
    //     // "cutMessage_by_matchTreePath(path, message, 1, 2)": cutMessage_by_matchTreePath(path, message, 1, 2),
    //     // "cutMessage_by_matchTreePath(path, message, 0, 2)": cutMessage_by_matchTreePath(path, message, 0, 2),
    //     // "cutMessage_by_matchTreePath(path, message, 3, 4)": cutMessage_by_matchTreePath(path, message, 3, 4),
    //     // "cutMessage_by_matchTreePath(path, message, 0, 5)": cutMessage_by_matchTreePath(path, message, 0, 5),
    //     // "cutMessage_by_matchTreePath(path, message, -1, 5)": cutMessage_by_matchTreePath(path, message, -1, 5),
    // });

    return {
        // request,
        // rPretty: {
        //     interval: request.interval_ms !== undefined ? prettyMilliseconds(request.interval_ms) : undefined,
        //     from: request.from !== undefined ? (new Date(request.from)).toLocaleTimeString(timeLocale, {timeZone}) : undefined,
        //     to:     request.to !== undefined ? (new Date(request.to))  .toLocaleTimeString(timeLocale, {timeZone}) : undefined,
        //     next_unix: request.next_unix !== undefined ? (new Date(request.next_unix)).toLocaleString(timeLocale, {timeZone}) : undefined,
        // }
        interval_ms:  request.interval_ms,
        from:      request.from,
        to:        request.to,
        next_unix: request.next_unix,
    };

}
