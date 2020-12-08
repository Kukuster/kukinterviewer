import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import parseTags_fromQuestionText from "../../textProcessing/parseTags_fromQuestionText";
import prepareQuestionText from "../../textProcessing/prepareQuestionText";
import { addQuestion_execute_args } from "../addQuestion/execute";
import { denyShoot, shoot } from "./matchTree";


export default async function submitQuestionText_prepare(msg: IIMessage, path: treeStep[])
    : Promise<addQuestion_execute_args | 'deny'>
{

    const theShoot: shoot = path[path.length - 1].shoot;

    const message = msg.text!;

    if (theShoot === denyShoot) {
        return 'deny';

    } else { 
        // parse Tags from the question text
        const Tags = parseTags_fromQuestionText(message);

        return {
            questionText: prepareQuestionText(message) || null,
            Tags: Tags.length ? Tags : undefined
        };

    }

}
