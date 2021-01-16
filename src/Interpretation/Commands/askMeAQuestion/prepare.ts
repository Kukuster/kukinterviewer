import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import getQids_fromPassedTree from "../../matchTree/extras/getQids_fromPassedTree";
import getTags_fromPassedTree from "../../matchTree/extras/getTags_fromPassedTree";


export default async function askMeAQuestion_prepare(msg: IIMessage, path: treeStep[]): Promise<questionsQuery> {
    const theShoot: shoot = path[path.length - 1].shoot;


    if (theShoot.random) {
        // those questions are asked which are enabled
        return { enabled: true, havingTagsEnabled: true, random: true };

    } else if (theShoot.qid) {

        const qids = getQids_fromPassedTree(path);

        if (qids.length > 0) {
            // when explicitly asked for specific qids, give a random one from those which asked regardless of if they're enabled
            return { qids: qids as [number, ...number[]], random: true };
        } else {
            // those questions are asked which are enabled
            return { enabled: true, havingTagsEnabled: true, random: true };
        }

    } else if (theShoot.Tags) {

        const Tags = getTags_fromPassedTree(path);

        if (Tags.length > 0){
            // when explicitly asked for specific tags, give a random one from those which have any of the given tags but all tags enabled
            return { enabled: true, havingTagsEnabled: true, Tags: Tags as [string, ...string[]], random: true };
        } else {
            // those questions are asked which are enabled
            return { enabled: true, havingTagsEnabled: true, random: true };
        }

    } else {
        // never happens
        return { enabled: true, havingTagsEnabled: true, random: true };
    }

}
