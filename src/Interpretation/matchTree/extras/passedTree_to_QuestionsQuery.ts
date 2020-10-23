import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { questionsQueryShoot } from "./questionsQueryShoot.type";
import { treeStep } from "../walk";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";
import parseQids from "./parseQids";

/**
 * 
 * This function can be used in `Command.prepare` method for such Commands
 *  that need to form questionsQuery type for execution (for complex querying questions),
 *  and whose `.match` method's matchTree ends with a shoot of `questionsQueryShoot` type
 * 
 * @param path resulted path from tree traverse (walk)
 */
export function passedTree_to_QuestionsQuery(path: treeStep[]): questionsQuery | 'all' {
    
    const theShoot: questionsQueryShoot = path[path.length - 1].shoot;

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
    

    if (theShoot === 'all') {
        return 'all';

    } else {


        let result: questionsQuery = {};


        // TAGS //

        if (theShoot.Tags === 'some') {

            let Tags: string[] = [];

            for (let i = 0; i < path.length; i++) {
                const parsedTags = parseTags(path[i].word);
                if (parsedTags) {
                    Tags = Tags.concat(parsedTags);
                };
            };

            if (Tags.length) {
                result.Tags = Tags as [string, ...string[]];
            } else {
                result.Tags = undefined;
            }

        } // if Tags === 'some'
        else {
            result.Tags = theShoot.Tags;
        }


        // QIDS //

        let qids: number[];

        if (theShoot.qids === 'some') {

            let stringDigits: string[] = [];

            for (let i = 0; i < path.length; i++) {
                const parsedDigits = path[i].word.match(digit);
                if (parsedDigits) {
                    stringDigits = stringDigits.concat(parsedDigits);
                };
            };

            //console.log('msg: \"'+msg.text+'\"', 'stringDigits: ', stringDigits);

            qids = [];

            stringDigits.forEach(sD => {
                const int = parseQids(sD);

                int &&
                    qids.push.apply(qids, int);
            });

            if (qids.length) {
                result.qids = qids as [number, ...number[]];
            } else {
                result.qids = undefined;
            }

        } // if qids === 'some'



        result.enabled = theShoot.enabled;


        return result;

    } // if theShoot !== 'all'    


}
