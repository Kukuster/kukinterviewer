import { IIMessage } from "../../../core/Command/Command";
import { RequireAtLeastOne } from "../../../reusable/RequireAtLeastOne.type";


export type setAskingTime_partialArgs = {
    interval_ms?: number,
    next_unix?: number,
    from?: number,
    to?: number,
}

export type setAskingTime_args = RequireAtLeastOne<setAskingTime_partialArgs>;


export default async function setAskingTime_execute(msg: IIMessage, args: any) {

    const chatId = msg.chat.id;

    return args;

}
