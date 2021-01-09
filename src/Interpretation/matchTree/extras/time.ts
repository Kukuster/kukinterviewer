import datejs from 'date.js';
import parseDuration from 'parse-duration';
import { isValidDate } from "../../../reusable/datetime";
import roundBy from "../../../reusable/roundBy";
import { treeStep } from "../walk";
import cutMessage_by_matchTreePath from "./cutMessage_by_matchTreePath";


export const extractDatetime_fromPassedTree = (path: treeStep[], message: string, index_left: number, index_right: number, now: Date) => {
    let request_part_substring = cutMessage_by_matchTreePath(path, message, index_left, index_right);
    request_part_substring = request_part_substring.replace(/a.m./ig, 'am');
    request_part_substring = request_part_substring.replace(/p.m./ig, 'pm');
    const parsedDate = datejs(request_part_substring, now);
    const parsedDateUnix_rounded = roundBy(parsedDate.getTime(), 1000);

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


