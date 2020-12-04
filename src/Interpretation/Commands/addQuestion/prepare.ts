'use strict';
import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { aquoteOpenRE, dquoteOpenRE, newlineRE, shoot, squoteOpenRE, tquoteOpenRE } from "./matchTree";
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

    // the var is declared to be equal to the original message, but is going to become a text of an actual question
    let questionText: string = message;

    let Tags: string[] = [];
    let intermediateVar_Tags: string[] | undefined;

    const cutQuestionTextAndParseTagsOnTheWay = (quoteOpenRE: RegExp, quoteOpen: string, quoteClose: string) => {
        let i = 0;
        
        // looping through the matchTree path until the occurance of a specifically recognized open quote
        while (!path[i].word.match(quoteOpenRE)) {
            // while looping, parse tags outside the question text (that what's between the quotes)
            intermediateVar_Tags = parseTags(path[i].word);
            intermediateVar_Tags && intermediateVar_Tags[0] ? 
                Tags.push(intermediateVar_Tags[0]) : 
                null;

            // cut the msg text up to the current word in the matchTree path
            questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);

            i++;

        };

        // after the looping and cutting off everything that made the tree recognize this "add question" command,
        // it cuts off all the text between the first occurance of an open quote and the first occurance of a closing quote
        questionText = cutOffUpToWithFirstOccurance(questionText, quoteOpen);
        questionText = cutOffFromWithFirstOccurance(questionText, quoteClose);
    };

    switch (theShoot.quotes){
        case 'double':
            cutQuestionTextAndParseTagsOnTheWay(dquoteOpenRE, dquoteOpen, dquoteClose);
            break;
        case 'single':
            cutQuestionTextAndParseTagsOnTheWay(squoteOpenRE, squoteOpen, squoteClose);
            break;
        case 'tg':
            cutQuestionTextAndParseTagsOnTheWay(tquoteOpenRE, tquoteOpen, tquoteClose);
            break;
        case 'angle':
            cutQuestionTextAndParseTagsOnTheWay(aquoteOpenRE, aquoteOpen, aquoteClose);
            break;
        case 'noQuotes_butAnEndline':
        default:
            let i = 0;
            // looping through the matchTree path until the occurance of a specifically recognized open quote
            while (!path[i].word.match(newlineRE)) {
                // while looping, parse tags outside the question text
                intermediateVar_Tags = parseTags(path[i].word);
                intermediateVar_Tags && intermediateVar_Tags[0] ?
                    Tags.push(intermediateVar_Tags[0]) :
                    null;

                // cut the msg text up to the current word in the matchTree path
                questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);

                i++;

            };

            // cut up to the newline that matched right before the question text
            questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);
    };

    
    // parse Tags from the question text
    Tags = Tags.concat(parseTags(questionText) || []);
    Tags = uniquifyArray(Tags.map(t => t.toLowerCase()));
    
    // removes lines that contain only tags from the questionText
    questionText = questionText.replace(/^((\s)*|(#([0-9_]*([a-zA-Z]+[0-9_]*)+))*)*$/gm, '');
    // trims any trailing and leading whitespace
    questionText = questionText.trim();



    return { questionText: questionText, Tags: Tags?.length ? Tags : undefined };
    

};
