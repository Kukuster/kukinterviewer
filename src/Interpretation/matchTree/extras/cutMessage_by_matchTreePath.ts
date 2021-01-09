import { cutOffFromFirstOccurance, cutOffFromWithFirstOccurance, cutOffUpToFirstOccurance, cutOffUpToWithFirstOccurance } from "../../../core/misc";
import { treeStep } from "../walk";

/**
 * Cuts off a substring from a `message` that walked on a matchTree by a given `path` and indeces in it
 * @param path matchTree traversed path
 * @param message string which walked on a matchTree by `path`
 * @param from index of the first word in `path` to include
 * @param to index of the last word in `path` to include
 */
export default function cutMessage_by_matchTreePath(path: treeStep[], message: string, from: number, to: number)
    : string
{
    if (to < from) { 
        throw new Error(`cutMessage_by_matchTreePath: passed parameters: {from: ${from}, to: ${to}}. "to" should not be less than "from"`);
    }

    const path_len = path.length;
    const i_last = path_len - 1;
    const last_step = path[i_last];
    let substring = "";
    let oneStepPiece = "";

    for (let i = 0; i < path_len; i++){
        if (i < from) {
            message = cutOffUpToFirstOccurance(message, path[i].word);
        } else if (i <= to) {
            oneStepPiece = cutOffUpToFirstOccurance(message, path[i].word);
            if (i === to || i === i_last) {
                oneStepPiece = cutOffFromFirstOccurance(oneStepPiece, path[i].word);
            } else if (i + 1 <= i_last) {
                oneStepPiece = cutOffFromWithFirstOccurance(oneStepPiece, path[i+1].word);
            }
            substring += oneStepPiece;
            message = cutOffUpToWithFirstOccurance(message, path[i].word);
        } else {
            process.env.NODE_ENV !== 'test' && console.log(`cutMessage_by_matchTreePath: «${substring}»`);
            return substring;
        }
    }

    process.env.NODE_ENV !== 'test' && console.log(`cutMessage_by_matchTreePath: «${substring}»`);
    return substring;

}
