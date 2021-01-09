import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { questionsQueryShoot } from "./questionsQueryShoot.type";
import { treeStep } from "../walk";
import getTags_fromPassedTree from "./getTags_fromPassedTree";
import getQids_fromPassedTree from "./getQids_fromPassedTree";

/**
 * 
 * This function can be used in `Command.prepare` method for such Commands
 *  that need to form questionsQuery type for execution (for complex querying questions),
 *  and whose `.match` method's matchTree ends with a shoot of `questionsQueryShoot` type
 * 
 * @param path resulted path from tree traverse (walk)
 */
export function passedTree_to_QuestionsQuery(path: treeStep[]): questionsQuery | 'all' {
    
    const theShoot: questionsQueryShoot = path[path.length - 1].shoot;
   

    if (theShoot === 'all') {
        return 'all';

    } else {

        const result: questionsQuery = {};


        // TAGS //
        if (theShoot.Tags === 'some') {
            const Tags: string[] = getTags_fromPassedTree(path);
            result.Tags = Tags.length ? Tags as [string, ...string[]] : undefined;
        } else {
            result.Tags = theShoot.Tags;
        }


        // QIDS //
        if (theShoot.qids === 'some') {
            const qids = getQids_fromPassedTree(path);
            result.qids = qids.length ? qids as [number, ...number[]] : undefined;
        }


        // STATUS //
        // // TODO: matchTrees should figure out havingTagsEnabled flag
        // if (theShoot.enabled === true) {
        //     result.enabled = true;
        //     result.havingTagsEnabled = true;
        // } else if (theShoot.enabled === false) {
        //     result.enabled = false;
        // }
        result.enabled = theShoot.enabled;
        


        return result;

    }

}
