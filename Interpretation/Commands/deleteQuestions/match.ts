import { IIMessage } from "../../../core/Command/Command";
import { splitToWords } from "../../matchTree/splitToWords";
import { traverse, treeStep } from "../../matchTree/walk";
import { deleteQuestions_tree } from "./matchTree";


export default async function deleteQuestions_match(msg: IIMessage): Promise<treeStep[] | null> {
    // console.log('deleteQuestions.match');
    const message = msg.text;
    if (!message) {
        return null;
    }
    
    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }

    const path: treeStep[] = [];
    
    traverse(deleteQuestions_tree, Words, path);
    
    return (path.length && path[path.length - 1].shoot) ? 
                path :
                null;

}

