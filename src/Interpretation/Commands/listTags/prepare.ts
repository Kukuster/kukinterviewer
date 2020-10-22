import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";
import { tagsQuery } from "../../../core/sheet/methods/tags/getTags";
import { passedTree_to_TagsQuery } from "../../matchTree/extras/passedTree_to_TagsQuery";


export default async function listTags_prepare(msg: IIMessage, path: treeStep[]): Promise<tagsQuery | 'all'> {


    const theShoot: shoot = path[path.length - 1].shoot;

    return passedTree_to_TagsQuery(path);
    

}
