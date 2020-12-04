import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import getTags_fromPassedTree from "../../matchTree/extras/getTags_fromPassedTree";
import getQidsAndTags_fromPassedTree from "../../matchTree/extras/getQidsAndTags_fromPassedTree";


export default async function addTagsToQuestions_prepare (msg: IIMessage, path: treeStep[])
    : Promise<{ qids: number[] | 'all', Tags: string[] }>
{

    const theShoot: shoot = path[path.length - 1].shoot;    


    if (theShoot.questions === 'all'){

        return { qids: 'all', Tags: getTags_fromPassedTree(path) };

    } else {

        return getQidsAndTags_fromPassedTree(path);

    }
    

}
