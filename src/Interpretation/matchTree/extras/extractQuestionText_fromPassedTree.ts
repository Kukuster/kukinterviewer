import { cutOffFromWithFirstOccurance, cutOffUpToWithFirstOccurance } from "../../../core/misc";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";
import { newlineRE } from "../../Commands/addQuestion/matchTree";
import { aquoteClose, aquoteOpen, aquoteOpenRE, dquoteClose, dquoteOpen, dquoteOpenRE, quotesType, squoteClose, squoteOpen, squoteOpenRE, tquoteClose, tquoteOpen, tquoteOpenRE } from "../../textProcessing/quotes";
import { treeStep } from "../walk";


export default function extractQuestionText_fromPassedTree(path: treeStep[], message: string, quotes: quotesType | 'endline')
    : {
        questionText: string,
        Tags: string[],
    }
{ 

    let questionText: string = message;
    const Tags: string[] = [];
    let intermediateVar_Tags: string[] | undefined;


    let leftBorderRE, leftBorder, rightBorder;
    switch (quotes) {
        case 'double quotes':
            [leftBorderRE, leftBorder, rightBorder] = [dquoteOpenRE, dquoteOpen, dquoteClose];
            break;
        case 'single quotes':
            [leftBorderRE, leftBorder, rightBorder] = [squoteOpenRE, squoteOpen, squoteClose];
            break;
        case 'tg quotes':
            [leftBorderRE, leftBorder, rightBorder] = [tquoteOpenRE, tquoteOpen, tquoteClose];
            break;
        case 'angle quotes':
            [leftBorderRE, leftBorder, rightBorder] = [aquoteOpenRE, aquoteOpen, aquoteClose];
            break;
        case 'endline':
        default:
            leftBorderRE = newlineRE;
            break;
    }


    /**
     * Cutting out words of matchTree path until leftBorder found
     * parse Tags on the way
     */
    // looping through the matchTree path until the occurance of a left border string
    let i = 0; while (!path[i].word.match(leftBorderRE)) {
        // while looping, parse tags outside the question text (that what's between the quotes)
        intermediateVar_Tags = parseTags(path[i].word);
        intermediateVar_Tags && intermediateVar_Tags[0] ?
            Tags.push(intermediateVar_Tags[0]) :
            null;

        // cut the msg text up to the current word in the matchTree path
        questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);

        i++;
    }

    /**
     * Cutting questionText either between left and right borders, or starting after left border
     */
    if (leftBorder && rightBorder) {
        // after the looping and cutting off everything that made the tree recognize this "add question" command,
        // it cuts off all the text between the first occurance of a leftBorder and the first occurance of a rightBorder
        questionText = cutOffUpToWithFirstOccurance(questionText, leftBorder);
        questionText = cutOffFromWithFirstOccurance(questionText, rightBorder);
    } else {
        // cut up to the string that matched leftBorderRE right before the question text
        questionText = cutOffUpToWithFirstOccurance(questionText, path[i].word);
    }



    return { questionText, Tags };

}
