import { IIMessage } from "../../../core/Command/Command";
import { nodeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";


export default async function turnQuestionsOnOff_prepare (msg: IIMessage, path: nodeStep[]): Promise<{ turn: 'on'|'off', questions: number[]|'all' }> {
    // console.log('turnQuestionsOnOff.prepare');

    const digitRE = /(\d+)/g;
    const theShoot:shoot = path[path.length - 1].shoot;

    // console.log("#=#=#=#=# PREPARE #=#=#=#=#");
    // console.log('got shoot: ', theShoot);
    // console.log("#=#=#=#=# #=#=#=#=#");

    if (theShoot.questions === 'some'){

        const questions: number[] = [];

        // console.log('got questions isArray: ', questions);

        // console.log('got path (words): ', path.map((step)=>step.word));

        // parse integres from the tree path
        path.forEach((step) => {
            step.word.match(digitRE)?.forEach((d) => {
                questions.push(parseInt(d))
            })
            // console.log('forEach(step): step.word = ', step.word, '; now questions: ', questions);
        });

        // console.log('parsed ints',questions);

        // leave only unqiue entries
        // console.log('uniquified', uniquifyArray(questions));

        // console.log("#=#=#=#=# #=#=#=#=#");

        return { turn: theShoot.turn, questions: uniquifyArray(questions) };

    } else {

        // console.log('got ', questions);

        // console.log("#=#=#=#=# #=#=#=#=#");
        return { turn: theShoot.turn, questions: theShoot.questions };

    }
    

}
