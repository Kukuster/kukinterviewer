'use strict';
import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import extractQuestionText_fromPassedTree from "../../matchTree/extras/extractQuestionText_fromPassedTree";
import parseTags_fromQuestionText from "../../textProcessing/parseTags_fromQuestionText";
import prepareQuestionText from "../../textProcessing/prepareQuestionText";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


export default async function addQuestion_prepare(msg: IIMessage, path: treeStep[])
    : Promise<{ questionText: string | null, Tags?: string[], enabled?: boolean }>
{

    const theShoot: shoot = path[path.length - 1].shoot;

    const message = msg.text!;


    if (theShoot.delimiters) {
        const extracted = extractQuestionText_fromPassedTree(path, message, theShoot.delimiters);

        // parse Tags from the extracted question text
        const Tags = parseTags_fromQuestionText(extracted.questionText, extracted.Tags);


        return {
            questionText: prepareQuestionText(extracted.questionText),
            Tags: Tags.length ? Tags : undefined
        };

    } else {
        // no delimiters means no question text detected

        const Tags = parseTags_fromQuestionText(message);

        return {
            questionText: null,
            Tags: Tags?.length ? Tags : undefined
        };

        
    }
    

}
