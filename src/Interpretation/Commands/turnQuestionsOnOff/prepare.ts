import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";


export default async function turnQuestionsOnOff_prepare (msg: IIMessage, path: treeStep[]): Promise<{ turn: 'on'|'off', questions: number[]|'all' }> {

    const digitRE = /(\d+)/g;
    const theShoot:shoot = path[path.length - 1].shoot;

    if (theShoot.questions === 'some'){

        const questions: number[] = [];

        // parse integres from the tree path
        path.forEach((step) => {
            step.word.match(digitRE)?.forEach((d) => {
                questions.push(parseInt(d))
            })
        });

        return { turn: theShoot.turn, questions: uniquifyArray(questions) };

    } else {

        return { turn: theShoot.turn, questions: theShoot.questions };

    }
    

}
