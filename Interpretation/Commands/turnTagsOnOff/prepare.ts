import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


export default async function turnTagsOnOff_prepare (msg: IIMessage, path: treeStep[]): Promise<{  }> {


    const theShoot: shoot = path[path.length - 1].shoot;

    if (theShoot.Tags === 'some') {

        let Tags: string[] = [];

        for (let i = 1; i < path.length; i++) {
            const parsedTags = parseTags(path[i].word);
            if (parsedTags) {
                Tags = Tags.concat(parsedTags);
            };
        };

        return { Tags: uniquifyArray(Tags), turn: theShoot.turn };

    } else {

        return { Tags: theShoot.Tags, turn: theShoot.turn };

    }
    

}
