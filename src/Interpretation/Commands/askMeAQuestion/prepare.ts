import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { parseTags } from "../../../core/sheet/methods/functions/hashtag";
import parseQids from "../../matchTree/extras/parseQids";


export default async function askMeAQuestion_prepare(msg: IIMessage, path: treeStep[]): Promise<questionsQuery> {


    const theShoot: shoot = path[path.length - 1].shoot;

    const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
    
    if (theShoot.random){
        return { enabled: true, havingTagsEnabled: true, random: true };
    } else 
    if (theShoot.qid){

        let stringDigits: string[] = [];

        for (let i = 0; i < path.length; i++){
            const parsedDigits = path[i].word.match(digit);
            if (parsedDigits) {
                stringDigits = stringDigits.concat(parsedDigits);
            };
        };

        let qids: number[] = [];
        stringDigits.forEach(sD => {
            const int = parseQids(sD);
            int ? qids.push.apply(qids,int) : '';
        });

        if (qids.length > 0){
            return { qids: qids as [number, ...number[]], random: true };
        } else {
            return { enabled: true, havingTagsEnabled: true, random: true };
        };

    } else
    if (theShoot.Tags) {

        let Tags: string[] = [];

        for (let i = 0; i < path.length; i++) {
            const parsedTags = parseTags(path[i].word);
            if (parsedTags) {
                Tags = Tags.concat(parsedTags);
            };
        };

        if (Tags.length > 0){
            return { enabled: true, havingTagsEnabled: true, Tags: Tags as [string, ...string[]], random: true };
        } else {
            return { enabled: true, havingTagsEnabled: true, random: true };
        };

    } else // never happens
    {
        return { enabled: true, havingTagsEnabled: true, random: true };
    };
    

};