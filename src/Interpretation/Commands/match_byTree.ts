'use strict';
import { IIMessage, TelegramMessageLengthHardLimit } from "../../bot/botlib";
import { splitToWords } from "../matchTree/extras/splitToWords";
import { nodeLike } from "../matchTree/node";
import { traverse, treeStep } from "../matchTree/walk";


export default (matchTree: nodeLike, lim: {chars?: number | 'max', words?: number, unmatchesInRow?: number} = {chars: 800}) => async function match_byTree(msg: IIMessage): Promise<treeStep[] | null> {
    const message = msg.text;
    if (!message) {
        return null;
    }
    if (lim.chars === 'max'){
        lim.chars = TelegramMessageLengthHardLimit;
    }
    if (lim.chars && lim.chars > 0 && message.length > lim.chars){
        return null;
    }

    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }
    if (lim.words && lim.words > 0 && Words.length > lim.words){
        return null;
    }

    const path: treeStep[] = [];

    traverse(matchTree, Words, path, lim.unmatchesInRow);

    return (path.length && path[path.length - 1].shoot) ?
        path :
        null;

};


