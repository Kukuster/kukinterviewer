import { IIMessage } from "../../../core/Command/Command";
import { splitToWords } from "../../matchTree/splitToWords";
import { traverse, treeStep } from "../../matchTree/walk";
import { addTagsToQuestion_tree } from "./matchTree";


export default async function addTagsToQuestion_match(msg: IIMessage): Promise<treeStep[] | null> {
    // console.log('addTagsToQuestion.match');
    const message = msg.text;
    if (!message) {
        return null;
    }
    
    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }

    const path: treeStep[] = [];
    
    traverse(addTagsToQuestion_tree, Words, path);
    
    return (path.length && path[path.length - 1].shoot) ? 
                path :
                null;

}

