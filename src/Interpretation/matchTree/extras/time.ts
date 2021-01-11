import datejs from 'date.js';
import parseDuration from 'parse-duration';
import { getNextDay, isValidDate } from "../../../reusable/datetime";
import round from "../../../reusable/round";
import { treeStep } from "../walk";
import cutMessage_by_matchTreePath from "./cutMessage_by_matchTreePath";




export const prepareDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number) => {
    let request_part_substring = cutMessage_by_matchTreePath(path, message, index_left, index_right);

    ///// a fix for that datejs lib /////
    // NOTE: this may be a temporary fix

    request_part_substring = request_part_substring.replace(/a.m./ig, 'AM');
    request_part_substring = request_part_substring.replace(/p.m./ig, 'PM');
    
    ///// /////


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
    return parseDatetime(message_substr, now);
};


export const extractForthcomingDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number, now: Date) => {
    if (!isValidDate(now)) {
        return null;
    }

    const now_unix = now.getTime();

    const message_substr = prepareDatetime_fromPassedTree(path, message, index_left, index_right);
    let parsedDatetime = parseDatetime(message_substr, now);

    // it could be that the part of the message was "next question at 10:00",
    // but now its 11:00, so datejs would parse it to be 10:00 today (in past) instead of 10:00 tomorrow
    // Therefore, if the parsed date is in past, try parse one more time with offset of 1 day in the future
    if (parsedDatetime && parsedDatetime <= now_unix) {
        parsedDatetime = parseDatetime(message_substr, getNextDay(now)!);
        
        if (parsedDatetime && parsedDatetime <= now_unix) {
            return 'mentioned datetime is in the past';
        }

    }

    if (parsedDatetime && isValidDate(new Date(parsedDatetime))) {
        return round(parsedDatetime, 1000);
    } else {
        return null;
    }

};


export const extractDuration_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number) => {
    let request_part_substring = cutMessage_by_matchTreePath(path, message, index_left, index_right);


    ///// a fix for that parse-duration lib /////
    // NOTE: this may be a temporary fix

    request_part_substring = request_part_substring.replace(/\b(every|each)\s+(second|sec)\b/ig, 'every 1 second');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+(minute|min)\b/ig, 'every 1 minute');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+(hour|hr)\b/ig,    'every 1 hour');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+day\b/ig,          'every 1 day');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+(week|wk)\b/ig,    'every 1 week');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+fortnite\b/ig,     'every 1 fortnite');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+month\b/ig,        'every 1 month');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+(year|y)\b/ig,     'every 1 year');
    request_part_substring = request_part_substring.replace(/\b(every|each)\s+decade\b/ig,       'every 1 decade');

    request_part_substring = request_part_substring.replace(/\bdaily\b/ig, 'every 1 day');
    request_part_substring = request_part_substring.replace(/\btwice\s+a\s+day\b/ig, 'every 12 hours');

    request_part_substring = request_part_substring.replace(/\bevery\s+other\s+day\b/ig, 'every 2 days');



    request_part_substring = request_part_substring.replace(/\b(every|each)\b/, '');

    ///// /////

    
    return parseDuration(request_part_substring);
};

