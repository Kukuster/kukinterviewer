import { uniquifyArray } from "../../core/misc";
import { parseTags } from "../../core/sheet/methods/functions/hashtag";

/**
 * 
 * An array with tags from `Tags` and new tags from `questionText`
 * 
 * @param questionText question text with tags
 * @param Tags an array with some tags
 * 
 * @returns {string[]}
 */
export default function (questionText: string, Tags?: string[]): string[] { 
    Tags = Tags ?
        Tags.concat(parseTags(questionText) || []) :
        parseTags(questionText) || [];

    return uniquifyArray(
        Tags.map(t => t.toLowerCase())
    );
}

