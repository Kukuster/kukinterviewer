import { IIMessage } from "../../../core/Command/Command";
import { splitToWords } from "../../matchTree/extras/splitToWords";
import { traverse, treeStep } from "../../matchTree/walk";
import { askMeAQuestion_tree } from "./matchTree";


export default async function askMeAQuestion_match(msg: IIMessage): Promise<treeStep[] | null> {
    // console.log('askMeAQuestion.match');
    const message = msg.text;
    if (!message) {
        return null;
    }
    
    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }

    const path: treeStep[] = [];
    
    traverse(askMeAQuestion_tree, Words, path);
    
    return (path.length && path[path.length - 1].shoot) ? 
                path :
                null;

}

