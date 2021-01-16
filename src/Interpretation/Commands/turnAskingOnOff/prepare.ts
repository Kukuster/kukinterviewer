import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";


export default async function turnAskingOnOff_prepare (msg: IIMessage, path: treeStep[]): Promise<shoot> {

    const theShoot: shoot = path[path.length - 1].shoot;

    return theShoot;

}
