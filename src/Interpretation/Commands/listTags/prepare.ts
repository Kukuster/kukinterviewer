import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { tagsQuery } from "../../../core/sheet/methods/tags/getTags";
import { passedTree_to_TagsQuery } from "../../matchTree/extras/passedTree_to_TagsQuery";


export default async function listTags_prepare(msg: IIMessage, path: treeStep[]): Promise<tagsQuery | 'all'> {

    return passedTree_to_TagsQuery(path);

}
