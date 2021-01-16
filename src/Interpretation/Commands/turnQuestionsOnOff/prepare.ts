import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import getQids_fromPassedTree from "../../matchTree/extras/getQids_fromPassedTree";


export default async function turnQuestionsOnOff_prepare (msg: IIMessage, path: treeStep[]): Promise<{ turn: 'on'|'off', questions: number[]|'all' }> {

    const theShoot:shoot = path[path.length - 1].shoot;

    if (theShoot.questions === 'some'){

        return { turn: theShoot.turn, questions: getQids_fromPassedTree(path) };

    } else {

        return { turn: theShoot.turn, questions: theShoot.questions };

    }
    

}
