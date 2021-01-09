import { tagsQuery } from "../../../core/sheet/methods/tags/getTags";
import { tagsQueryShoot } from "./tagsQueryShoot.type";
import { treeStep } from "../walk";

/**
 * 
 * This function can be used in `Command.prepare` method for such Commands
 *  that need to form tagsQuery type for execution (for complex querying questions),
 *  and whose `.match` method's matchTree ends with a shoot of `tagsQueryShoot` type
 * 
 * @param path resulted path from tree traverse (walk)
 */
export function passedTree_to_TagsQuery(path: treeStep[]): tagsQuery | 'all' {
    
    const theShoot: tagsQueryShoot = path[path.length - 1].shoot;

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;
    

    if (theShoot === 'all') {
        return 'all';

    } else {

        //TODO: support for querying by qids and by tagsStrParts

        let result: tagsQuery = {};

        result.enabled = theShoot.enabled;

        return result;

    } // if theShoot !== 'all'    


}
