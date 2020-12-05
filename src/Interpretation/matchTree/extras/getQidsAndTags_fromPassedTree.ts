import { treeStep } from "../walk";
import { uniquifyArray } from "../../../core/misc";
import parseQids from "./parseQids";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


/**
 * @param path traversed matchTree path
 * @returns object with array for Qids and array of Tags
 */
export default function getQidsAndTags_fromPassedTree(path: treeStep[]): {qids: number[], Tags: string[]} {

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;

    let Tags: string[] = [];
    const qids: number[] = [];
    let stringDigits: string[] = [];

    for (let i = 0; i < path.length; i++) {
        const parsedTags = parseTags(path[i].word);
        if (parsedTags && parsedTags.length) {
            Tags = Tags.concat(parsedTags);
        } else {
            const parsedDigits = path[i].word.match(digit);
            if (parsedDigits && parsedDigits.length) {
                stringDigits = stringDigits.concat(parsedDigits);
           }
        }
    }

    stringDigits.forEach(sD => {
        const int = parseQids(sD);
        int &&
            qids.push(...int);
    });

    return { qids, Tags: uniquifyArray(Tags.map(t => t.toLowerCase())) };

}
