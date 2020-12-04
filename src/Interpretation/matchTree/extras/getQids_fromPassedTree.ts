import { treeStep } from "../walk";
import { uniquifyArray } from "../../../core/misc";
import parseQids from "./parseQids";


/**
 * @param path traversed matchTree path
 * @returns array for Qids
 */
export default function getQids_fromPassedTree(path: treeStep[]): number[] {

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;

    const qids: number[] = [];
    let stringDigits: string[] = [];

    for (let i = 0; i < path.length; i++) {
        const parsedDigits = path[i].word.match(digit);
        if (parsedDigits && parsedDigits.length) {
            stringDigits = stringDigits.concat(parsedDigits);
        }
    }

    stringDigits.forEach(sD => {
        const int = parseQids(sD);
        int &&
            qids.push(...int);
    });

    return uniquifyArray(qids);

}
