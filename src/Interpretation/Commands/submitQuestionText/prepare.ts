import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import parseTags_fromQuestionText from "../../textProcessing/parseTags_fromQuestionText";
import prepareQuestionText from "../../textProcessing/prepareQuestionText";
import { addQuestion_questionText_charactersLimit } from "../addQuestion/prepare";
import { submitQuestionText_execute_args } from "./execute";
import { denyShoot, shoot } from "./matchTree";


export default async function submitQuestionText_prepare(msg: IIMessage, path: treeStep[])
    : Promise<submitQuestionText_execute_args>
{

    const theShoot: shoot = path[path.length - 1].shoot;

    const message = msg.text!;

    if (theShoot === denyShoot) {
        return {
            action: 'deny',
        };

    } else if (message.length > addQuestion_questionText_charactersLimit) {

        return {
            action: 'ask to provide smaller questionText',
            questionText: null,
        };

    } else { 
        // parse Tags from the question text
        const Tags = parseTags_fromQuestionText(message);

        const questionText = prepareQuestionText(message);

        if (questionText) { 
            return {
                action: 'add question',
                questionText: questionText,
                Tags: Tags.length ? Tags : undefined
            };
        } else {
            return {
                action: 'ask to provide a questionText (only Tags provided)',
                questionText: null,
                Tags: Tags.length ? Tags : undefined
            };
        }

    }

}
