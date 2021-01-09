import datejs from 'date.js';
import parseDuration from 'parse-duration';
import { getNextDay, isValidDate, verboseDatetime } from "../../../reusable/datetime";
import roundBy from "../../../reusable/roundBy";
import { treeStep } from "../walk";
import cutMessage_by_matchTreePath from "./cutMessage_by_matchTreePath";




export const prepareDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number) => {
    let request_part_substring = cutMessage_by_matchTreePath(path, message, index_left, index_right);
    request_part_substring = request_part_substring.replace(/a.m./ig, 'AM');
    request_part_substring = request_part_substring.replace(/p.m./ig, 'PM');
    return request_part_substring;
};

export const parseDatetime = (substr: string, now: Date) => {
    const parsedDate = datejs(substr, now);

    // datejs parser, when fails to parse, returns exactly the current datetime (uncool)
    if (!isValidDate(parsedDate) || parsedDate.getTime() === now.getTime()) {
        return null;
    } else {
        return parsedDate.getTime();
    }
};



export const extractTimeOfDay_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number, now: Date) => {
    if (!isValidDate(now)) {
        return null;
    }

    const message_substr = prepareDatetime_fromPassedTree(path, message, index_left, index_right);
    process.env.NODE_ENV !== 'test' && console.log('\x1b[2m%s\x1b[0m', 'extracted datetime substring from message', { path, message, index_left, index_right, message_substr });
    return parseDatetime(message_substr, now);
};


export const extractForthcomingDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number, now: Date) => {
    if (!isValidDate(now)) {
        return null;
    }

    const now_unix = now.getTime();

    const message_substr = prepareDatetime_fromPassedTree(path, message, index_left, index_right);
    let parsedDatetime = parseDatetime(message_substr, now);

    process.env.NODE_ENV !== 'test' && console.log({ nex: parsedDatetime, now: now_unix, nex_str: `${parsedDatetime ? verboseDatetime(parsedDatetime) : null}`, now_str: `${verboseDatetime(now)}` });

    // it could be that the part of the message was "next question at 10:00",
    // but now its 11:00, so datejs would parse it to be 10:00 today (in past) instead of 10:00 tomorrow
    // Therefore, if the parsed date is in past, try parse one more time with offset of 1 day in the future
    if (parsedDatetime && parsedDatetime <= now_unix) {
        process.env.NODE_ENV !== 'test' && console.log('\x1b[2m%s\x1b[0m','parsed datetime was less than now');
        parsedDatetime = parseDatetime(message_substr, getNextDay(now)!);
        
        if (parsedDatetime && parsedDatetime <= now_unix) {
            process.env.NODE_ENV !== 'test' && console.log({ nex: parsedDatetime, now: now_unix, nex_str: `${parsedDatetime ? verboseDatetime(parsedDatetime) : null}`, now_str: `${verboseDatetime(now)}`, "nex <= now": true });
            return 'mentioned datetime is in the past';
        }
        process.env.NODE_ENV !== 'test' && console.log({ nex: parsedDatetime, now: now_unix, nex_str: `${parsedDatetime ? verboseDatetime(parsedDatetime) : null}`, now_str: `${verboseDatetime(now)}` });
    }

    if (parsedDatetime && isValidDate(new Date(parsedDatetime))) {
        return roundBy(parsedDatetime, 1000);
    } else {
        return null;
    }

};


export const extractDuration_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number) => {
    return parseDuration(cutMessage_by_matchTreePath(path, message, index_left, index_right));
};


