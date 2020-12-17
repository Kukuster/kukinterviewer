'use strict';
import { IIMessage } from "../../core/Command/Command";
import { splitToWords } from "../matchTree/extras/splitToWords";
import { nodeLike } from "../matchTree/node";
import { traverse, treeStep } from "../matchTree/walk";


export default (matchTree: nodeLike) => async function match_byTree(msg: IIMessage): Promise<treeStep[] | null> {
    const message = msg.text;
    if (!message) {
        return null;
    }

    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }

    const path: treeStep[] = [];

    traverse(matchTree, Words, path);

    return (path.length && path[path.length - 1].shoot) ?
        path :
        null;

};


