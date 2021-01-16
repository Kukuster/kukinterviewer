import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import getTags_fromPassedTree from "../../matchTree/extras/getTags_fromPassedTree";
import getQids_fromPassedTree from "../../matchTree/extras/getQids_fromPassedTree";
import getQidsAndTags_fromPassedTree from "../../matchTree/extras/getQidsAndTags_fromPassedTree";


export default async function removeTagsFromQuestions_prepare (msg: IIMessage, path: treeStep[])
    : Promise<{ qids: number[] | 'all', Tags: string[] | 'all' }>
{

    const theShoot: shoot = path[path.length - 1].shoot;


    if (theShoot.questions === 'all' && theShoot.Tags === 'all') {
        
        return { qids: 'all', Tags: 'all' };

    } else if (theShoot.Tags === 'all') {
        
        return { qids: getQids_fromPassedTree(path), Tags: 'all' };
        
    } else if (theShoot.questions === 'all') {
        
        return { qids: 'all', Tags: getTags_fromPassedTree(path) };

    } else {
        
        return getQidsAndTags_fromPassedTree(path);

    }

}
