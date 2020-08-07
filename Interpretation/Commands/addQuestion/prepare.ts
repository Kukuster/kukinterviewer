'use strict';
import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray, cutOffUpToWithFirstOccurance, cutOffFromWithFirstOccurance } from "../../../core/misc";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


export default async function addQuestion_prepare(msg: IIMessage, path: treeStep[]): Promise<{ questionText: NonNullable<string>, Tags?: string[], enabled?: boolean }> {

    const theShoot: shoot = path[path.length - 1].shoot;

    const message = msg.text!;

    const dquoteOpen  = '"';
    const dquoteClose = '"';

    const squoteOpen  = "'";
    const squoteClose = "'";

    const tquoteOpen  = "«";
    const tquoteClose = "»";

    const aquoteOpen  = "<<";
    const aquoteClose = ">>";

    let questionText: string = message;


    for (let i = 0; i < theShoot.cutMatches; i++){
        questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);
    }

    switch (theShoot.quotes){
        case 'double':
            questionText = cutOffUpToWithFirstOccurance(questionText, dquoteOpen);
            questionText = cutOffFromWithFirstOccurance(questionText, dquoteClose);
            break;
        case 'single':
            questionText = cutOffUpToWithFirstOccurance(questionText, squoteOpen);
            questionText = cutOffFromWithFirstOccurance(questionText, squoteClose);
            break;
        case 'tg':
            questionText = cutOffUpToWithFirstOccurance(questionText, tquoteOpen);
            questionText = cutOffFromWithFirstOccurance(questionText, tquoteClose);
            break;
        case 'angle':
            questionText = cutOffUpToWithFirstOccurance(questionText, aquoteOpen);
            questionText = cutOffFromWithFirstOccurance(questionText, aquoteClose);
            break;
        default:
            // cut up to the newline that matched right before the question text
            questionText = cutOffUpToWithFirstOccurance(questionText, path[theShoot.cutMatches - 1].word);
    }

    
    // trims any trailing and leading whitespace
    questionText = questionText.trim();


    const Tags = parseTags(questionText);


    return { questionText: questionText, Tags: Tags?.length ? Tags : undefined };
    

}
