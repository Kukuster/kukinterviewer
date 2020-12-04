import { treeStep } from "../walk";
import { uniquifyArray } from "../../../core/misc";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


/**
 * @param path traversed matchTree path
 * @returns array for Tags without a hashtag
 */
export default function getTags_fromPassedTree(path: treeStep[]): string[] {

    let Tags: string[] = [];

    for (let i = 0; i < path.length; i++) {
        const parsedTags = parseTags(path[i].word);
        if (parsedTags && parsedTags.length) {
            Tags = Tags.concat(parsedTags);
        }
    }

    return uniquifyArray(Tags.map(t => t.toLowerCase()));

}
