import { IIMessage } from "../../../core/Command/Command";
import parseTimezone, { parseTimezone_result } from "../../textProcessing/parseTimezone";


export default async function askTimezone_prepare(msg: IIMessage, path: null)
    : Promise<parseTimezone_result>
{

    const message = msg.text!;

    return parseTimezone(message);

}
