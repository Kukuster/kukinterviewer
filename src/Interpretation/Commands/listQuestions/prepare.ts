import { IIMessage } from "../../../bot/botlib";
import { treeStep } from "../../matchTree/walk";
import { questionsQuery } from "../../../core/sheet/methods/questions/getQuestions";
import { passedTree_to_QuestionsQuery } from "../../matchTree/extras/passedTree_to_QuestionsQuery";


export default async function listQuestions_prepare (msg: IIMessage, path: treeStep[]): Promise<questionsQuery|'all'> {

    return passedTree_to_QuestionsQuery(path);

}
