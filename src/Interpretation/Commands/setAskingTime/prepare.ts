import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { setAskingTime_partialArgs } from "./execute";
import { shoot } from "./matchTree";
import { getTimeWithoutDate, timeUnitsVocabulary } from "../../../reusable/datetime";
import { extractForthcomingDatetime_fromPassedTree, extractDuration_fromPassedTree } from "../../matchTree/extras/time";



export default async function setAskingTime_prepare (msg: IIMessage, path: treeStep[])
    : Promise<setAskingTime_partialArgs | null>
{

    const path_len = path.length;

    const message = msg.text!;

    // // sometimes with msg.date it sends not the full date, but only a time of some very old day
    // const msgdate = msg.date;
    // const msgdatetime = getDateWithoutTime().getTime() + getTimeWithoutDate(msgdate);
    // const timezone = await getSettings(chatId, 'timezone');
    // const now = new Date(round(msgdatetime, 1000));
    
    const now = new Date();

    const request: setAskingTime_partialArgs = {
        now: {
            datetime: now.getTime(),
            shiftByTimezone: false,
        },
    };


    let toTime_word: number | undefined = 0,  toMeridiem_word: number | undefined = 0,
      fromTime_word: number | undefined = 0,fromMeridiem_word: number | undefined = 0;
    let atDateTime_words: number[] = [];
    let at_timepoint: number = 0, 
        at_timedifference: number = 0,
        at_tbd: number = 0;
    let interval_words:   number[] = [];
    
    let regularly: number | undefined;


    let gotDate: number | 'mentioned datetime is in the past' | null;
    let gotInterval: number | null;



    /**
     * remember the position of matched shoots within the tree
     */
    for (let i = 0; i < path_len; i++){
        const nd = path[i];
        const shoot = nd.shoot as shoot;
        

        if        (shoot === 'to (time)') {
            toTime_word = i;

        } else if (shoot === 'to (meridiem)') {
            toMeridiem_word = i;

        } else if (shoot === 'from (time)') {
            fromTime_word = i;

        } else if (shoot === 'from (meridiem)') {
            fromMeridiem_word = i;


        } else if (shoot === 'at (either a point or a difference)' ||
                   shoot === 'at (point of time)' ||
                   shoot === 'at (time difference)') {
            
            // saves the last sequence of adjacent (in a matchTree) "at time" words
            if (
                !atDateTime_words.length ||
                atDateTime_words[atDateTime_words.length - 1] === i - 1
            ) {
                // if array is empty, or the last element of array is the previous path index
                atDateTime_words.push(i);
            } else {
                // if a new "at" substring has been detected, overwrite previous one
                atDateTime_words = [i];
                [at_tbd, at_timepoint, at_timedifference] = [0,0,0];
            }


            // saves the number of occurances of each type of "at time" word
            if        (shoot === 'at (either a point or a difference)'){
                at_tbd++;
            } else if (shoot === 'at (point of time)') {
                at_timepoint++;
            } else if (shoot === 'at (time difference)') {
                at_timedifference++;
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


    } // for nd of path



    /**
     * extract the actual data from the message with cutting off a parsable substring by coordinates of nodes of a passed tree
     */
    // request.to
    if (toTime_word) {
        if (toMeridiem_word) {
            gotDate = extractForthcomingDatetime_fromPassedTree(path, message, toTime_word, toMeridiem_word, now);
        } else {
            gotDate = extractForthcomingDatetime_fromPassedTree(path, message, toTime_word, toTime_word, now);
        }
        request.to = {
            datetime: gotDate ? getTimeWithoutDate(gotDate) : 'matched by a matchTree but failed to parse',
            shiftByTimezone: true,
        };
    }
    // request.from
    if (fromTime_word) {
        if (fromMeridiem_word) {
            gotDate = extractForthcomingDatetime_fromPassedTree(path, message, fromTime_word, fromMeridiem_word, now);
        } else {
            gotDate = extractForthcomingDatetime_fromPassedTree(path, message, fromTime_word, fromTime_word, now);
        }
        request.from = {
            datetime: gotDate ? getTimeWithoutDate(gotDate) : 'matched by a matchTree but failed to parse',
            shiftByTimezone: true,
        };
    }
    // request.next_unix
    if (atDateTime_words.length) {
        gotDate = extractForthcomingDatetime_fromPassedTree(path, message, atDateTime_words[0], atDateTime_words[atDateTime_words.length - 1], now);
        request.next_unix = {
            datetime: gotDate ? gotDate : 'matched by a matchTree but failed to parse',
            shiftByTimezone: at_timepoint > at_timedifference,
        };
    }
    // request.interval_ms
    if (interval_words.length) {
        gotInterval = extractDuration_fromPassedTree(path, message, interval_words[0], interval_words[interval_words.length - 1]);
        request.interval = {
            interval_ms: gotInterval ? gotInterval : 'matched by a matchTree but failed to parse',
        };
    } else if (regularly) {
        request.interval = {
            interval_ms: timeUnitsVocabulary.days,
        };
    }


    if ((!request.from      || typeof request.from.datetime        !== 'number') &&
        (!request.to        || typeof request.to.datetime          !== 'number') &&
        (!request.next_unix || typeof request.next_unix.datetime   !== 'number') &&
        (!request.interval  || typeof request.interval.interval_ms !== 'number'))
    {
        return null;
    }


    /**
     * reassigning properties in a particular order
     */
    return {
        now:          request.now,

        interval: interval_words.length || regularly ? request.interval : undefined,

        from:         fromTime_word           ? request.from        : undefined,

        to:           toTime_word             ? request.to          : undefined,

        next_unix:    atDateTime_words.length ? request.next_unix   : undefined,

    };


}
