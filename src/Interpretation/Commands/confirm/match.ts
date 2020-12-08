import { IIMessage } from "../../../core/Command/Command";
import { splitToWords } from "../../matchTree/extras/splitToWords";
import { traverse, treeStep } from "../../matchTree/walk";
import { confirm_tree } from "./matchTree";


export default async function confirm_match(msg: IIMessage): Promise<treeStep[] | null> {

    const message = msg.text;
    if (!message) {
        return null;
    }

    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }

    const path: treeStep[] = [];

    traverse(confirm_tree, Words, path);

    return (path.length && path[path.length - 1].shoot) ?
        path :
        null;

}

