import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";


export default async function start_prepare (msg: IIMessage, path: treeStep[]): Promise<true> {

    return true;

}
