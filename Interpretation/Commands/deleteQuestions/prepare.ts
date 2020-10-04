import { IIMessage } from "../../../core/Command/Command";
import { treeStep } from "../../matchTree/walk";
import { shoot } from "./matchTree";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { passedTree_to_QuestionsQuery } from "../../matchTree/extras/passedTree_to_QuestionsQuery";


export default async function deleteQuestions_prepare(msg: IIMessage, path: treeStep[]): Promise<questionsQuery|'all'> {

    // const theShoot: shoot = path[path.length - 1].shoot;

    return passedTree_to_QuestionsQuery(path);

}
