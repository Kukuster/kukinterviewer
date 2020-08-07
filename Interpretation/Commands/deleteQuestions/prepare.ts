import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";


export default async function deleteQuestions_prepare(msg: IIMessage, path: treeStep[]): Promise<questionsQuery|'all'> {


    const theShoot: shoot = path[path.length - 1].shoot;

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;


    if (theShoot === 'all'){
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

        if (theShoot.qids === 'some'){

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
                let int = parseInt(sD);

                if (!int){
                    //if parseInt fails us, we can do better
                    sD = sD.replace(/\D/g, ' ');
                    const parsedDigits = sD.match(digit);
                    if (parsedDigits){
                        parsedDigits.forEach(pD => {
                            int = parseInt(pD);
                            int ? qids.push(int) : null;
                        })
                    }

                } else {
                    qids.push(int)
                }

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
