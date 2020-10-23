import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";
import parseQids from "../../matchTree/extras/parseQids";


export default async function addTagsToQuestions_prepare (msg: IIMessage, path: treeStep[])
    : Promise<{ qids: number[] | 'all', Tags: string[] }>
{

    // const message = msg.text!;
    // let cutmsg = cutOffUpToWithFirstOccurance(message, path[0].word);

    const theShoot: shoot = path[path.length - 1].shoot;

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
    


    let Tags: string[] = [];


    if (theShoot.questions === 'all'){

        for (let i = 1; i < path.length; i++) {
            const parsedTags = parseTags(path[i].word);
            if (parsedTags) {
                Tags = Tags.concat(parsedTags);
            };
        };

        return { qids: 'all', Tags: Tags };


    } else {

        let stringDigits: string[] = [];

        for (let i = 1; i < path.length; i++){
            const parsedTags = parseTags(path[i].word);
            if (parsedTags && parsedTags.length) {
                Tags = Tags.concat(parsedTags);
            } else {
                const parsedDigits = path[i].word.match(digit);
                // console.log('parsedDigits[' + i + ']: ', parsedDigits);
                if (parsedDigits) {
                    stringDigits = stringDigits.concat(parsedDigits);
                };
            };
        };

        // console.log('stringDigits', stringDigits);

        let qids: number[] = [];
        stringDigits.forEach(sD=>{
            const int = parseQids(sD);
            int &&
                qids.push.apply(qids,int);
        });


        return { qids: qids, Tags: Tags };

    };
    

}
