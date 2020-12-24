import datejs from 'date.js';
import parseDuration from 'parse-duration';
import { TZ } from '../../../conf';
import { convertFromTZ, getNextDay, isValidDate, verboseDatetime } from "../../../reusable/datetime";
import roundBy from "../../../reusable/roundBy";
import { treeStep } from "../walk";
import cutMessage_by_matchTreePath from "./cutMessage_by_matchTreePath";


export const extractForthcomingDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number, now: Date, timezone?: string | undefined) => {
    if (!isValidDate(now)){
        return null;
    }
    if (!timezone){
        timezone = TZ;
    }

    let request_part_substring = cutMessage_by_matchTreePath(path, message, index_left, index_right);
    request_part_substring = request_part_substring.replace(/a.m./ig, 'am');
    request_part_substring = request_part_substring.replace(/p.m./ig, 'pm');
    let parsedDate = convertFromTZ(datejs(request_part_substring, now), timezone);
    let parsedDateUnix_rounded = roundBy(parsedDate.getTime(), 1000);

    process.env.NODE_ENV !== 'test' && console.log('\x1b[2m%s\x1b[0m', { request_part_substring, now: new Date(now.setHours(16)), timezone, parsedDate_beforeConvertion: verboseDatetime(datejs(request_part_substring, now)) });
    process.env.NODE_ENV !== 'test' && console.log({ nex: parsedDateUnix_rounded, now: now.getTime(), nex_str: `${verboseDatetime(parsedDateUnix_rounded)}`, now_str: `${verboseDatetime(now)}` });
    // a part that makes sure it's a forthcoming datetime
    if (parsedDateUnix_rounded <= now.getTime()){
        process.env.NODE_ENV !== 'test' && console.log('\x1b[2m%s\x1b[0m','parsed datetime was less than now');
        parsedDate = convertFromTZ(datejs(request_part_substring, getNextDay(now)!), timezone);
        parsedDateUnix_rounded = roundBy(parsedDate.getTime(), 1000);
        process.env.NODE_ENV !== 'test' && console.log({ nex: parsedDateUnix_rounded, now: now.getTime(), nex_str: `${verboseDatetime(parsedDateUnix_rounded)}`, now_str: `${verboseDatetime(now)}` });
    }

    if (isValidDate(parsedDate) && parsedDateUnix_rounded !== now.getTime()) {
        const time = parsedDateUnix_rounded;
        // console.log({ request_part_substring, parsedDate, time });
        return time;
    } else {
        return null;
    }
};


export const extractDuration_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number) => {
    return parseDuration(cutMessage_by_matchTreePath(path, message, index_left, index_right));
};


