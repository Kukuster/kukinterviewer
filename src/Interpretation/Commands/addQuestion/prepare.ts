'use strict';
import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import extractQuestionText_fromPassedTree from "../../matchTree/extras/extractQuestionText_fromPassedTree";
import parseTags_fromQuestionText from "../../textProcessing/parseTags_fromQuestionText";
import prepareQuestionText from "../../textProcessing/prepareQuestionText";
import { addQuestion_execute_args } from "./execute";


export const addQuestion_questionText_charactersLimit = 3900;

export default async function addQuestion_prepare(msg: IIMessage, path: treeStep[])
    : Promise<addQuestion_execute_args>
{

    const theShoot: shoot = path[path.length - 1].shoot;

    const message = msg.text!;



    

    if (!theShoot.delimiters) {
        // no delimiters means no question text detected

        const Tags = parseTags_fromQuestionText(message);

        return {
            action: 'ask to provide a questionText',
            questionText: null,
            Tags: Tags?.length ? Tags : undefined,
        };
        
    } else if (message.length > addQuestion_questionText_charactersLimit) {
        return {
            action: 'ask to provide smaller questionText',
            questionText: null,
        };

    } else {
        const extracted = extractQuestionText_fromPassedTree(path, message, theShoot.delimiters);

        // parse Tags from the extracted question text
        const Tags = parseTags_fromQuestionText(extracted.questionText, extracted.Tags);


        return {
            action: 'add question',
            questionText: prepareQuestionText(extracted.questionText),
            Tags: Tags.length ? Tags : undefined,
        };

        
    }
    

}
