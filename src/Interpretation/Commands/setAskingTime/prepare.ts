import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { setAskingTime_partialArgs } from "./execute";
import { shoot } from "./matchTree";
import { getTimeWithoutDate, timeUnitsVocabulary } from "../../../reusable/datetime";
import roundBy from "../../../reusable/roundBy";
import { extractDatetime_fromPassedTree, extractDuration_fromPassedTree } from "../../matchTree/extras/time";



export default async function setAskingTime_prepare (msg: IIMessage, path: treeStep[]): Promise<setAskingTime_partialArgs> {
    // console.log(`setAskingTime.prepare(...)`);

    const path_len = path.length;

    const message = msg.text!;

    const request: setAskingTime_partialArgs = {};
    
    let toTime_word: number | undefined = 0,  toMeridiem_word: number | undefined = 0,
      fromTime_word: number | undefined = 0,fromMeridiem_word: number | undefined = 0;
    let atDateTime_words: number[] = [];
    let interval_words:   number[] = [];


    const now = new Date(roundBy(msg.date, 1000));


    let gotDate: number | null;
    let gotInterval: number | null;
    let regularly: number | undefined;



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



    /**
     * extract the actual data from the message with cutting off a parsable substring by coordinates of nodes of a passed tree
     */
    // request.to
    if (toTime_word) {
        if (toMeridiem_word) {
            gotDate = extractDatetime_fromPassedTree(path, message, toTime_word, toMeridiem_word, now);            
        } else {
            gotDate = extractDatetime_fromPassedTree(path, message, toTime_word, toTime_word, now);
        }
        request.to = gotDate ? getTimeWithoutDate(gotDate) : 'matched by a matchTree but failed to parse';
    }
    // request.from
    if (fromTime_word) {
        if (fromMeridiem_word) {
            gotDate = extractDatetime_fromPassedTree(path, message, fromTime_word, fromMeridiem_word, now);
        } else {
            gotDate = extractDatetime_fromPassedTree(path, message, fromTime_word, fromTime_word, now);
        }
        request.from = gotDate ? getTimeWithoutDate(gotDate) : 'matched by a matchTree but failed to parse';
    }
    // request.next_unix
    if (atDateTime_words.length) {
        gotDate = extractDatetime_fromPassedTree(path, message, atDateTime_words[0], atDateTime_words[atDateTime_words.length - 1], now);
        request.next_unix = gotDate ? gotDate : 'matched by a matchTree but failed to parse';
    }
    // request.interval_ms
    if (interval_words.length) {
        gotInterval = extractDuration_fromPassedTree(path, message, interval_words[0], interval_words[interval_words.length - 1]);
        request.interval_ms = gotInterval ? gotInterval : 'matched by a matchTree but failed to parse';
    } else if (regularly) {
        request.interval_ms = timeUnitsVocabulary.days;
    }



    /**
     * reassigning properties in a particular order
     */
    return {
        interval_ms:  request.interval_ms,
        from:         request.from,
        to:           request.to,
        next_unix:    request.next_unix,
    };


}
