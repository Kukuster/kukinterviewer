import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { uniquifyArray } from "../../../core/misc";


export default async function listQuestions_prepare (msg: IIMessage, path: treeStep[]): Promise<{  }> {


    const theShoot: shoot = path[path.length - 1].shoot;

    return {};
    

}
