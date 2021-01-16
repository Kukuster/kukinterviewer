import { IIMessage } from "../../../bot/botlib";
import { cutOffUpToWithFirstOccurance } from "../../../core/misc";
import { confirmableSheetMethod, is_confirmableSheetMethod } from "../../../core/sheet/sheet";
import { splitToWords } from "../../matchTree/extras/splitToWords";

export default async function suggestMethod_test_match(msg: IIMessage)
    : Promise<[confirmableSheetMethod, string | undefined] | null>
{
    console.log('suggestMethod_test.match');
    const message = msg.text;
    if (!message) {
        return null;
    }
    
    const Words = splitToWords(message);
    if (!Words) {
        return null;
    }


    if (Words[0].match(/^>(.*)/i)){
        console.log({
            'Words[0]': Words[0],
            'Words[2]': Words[2],
            'Words[0] === ">suggestMethod"': Words[0] === ">suggestMethod",
            'is_confirmableSheetMethod(Words[2])': is_confirmableSheetMethod(Words[2]),
            'cutOffUpToWithFirstOccurance(message, Words[2])': cutOffUpToWithFirstOccurance(message, Words[2])
        });
    }
    if (Words[0] === ">suggestMethod" && is_confirmableSheetMethod(Words[2])) {
        return [Words[2], cutOffUpToWithFirstOccurance(message, Words[2]) || undefined];
    } else {
        return null;
    }

}

