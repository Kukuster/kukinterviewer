import { IIMessage } from "../../../core/Command/Command";
import { splitToWords } from "../../matchTree/extras/splitToWords";

export default async function submitTimezone_match(msg: IIMessage)
    : Promise<string | null>
{
    // console.log('suggestMethod_test.match');
    const message = msg.text;
    if (!message) {
        return null;
    }
    
    const Words = splitToWords(message);
    if (!Words || Words.length === 0) {
        return null;
    }

    return message;

}

