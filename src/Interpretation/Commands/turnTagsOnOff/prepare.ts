import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import getTags_fromPassedTree from "../../matchTree/extras/getTags_fromPassedTree";


export default async function turnTagsOnOff_prepare (msg: IIMessage, path: treeStep[]): Promise<{ Tags: string[] | "all", turn: "on" | "off" }>  {


    const theShoot: shoot = path[path.length - 1].shoot;

    if (theShoot.Tags === 'some') {

        return { Tags: getTags_fromPassedTree(path), turn: theShoot.turn };

    } else {

        return { Tags: theShoot.Tags,                turn: theShoot.turn };

    }
    

}
