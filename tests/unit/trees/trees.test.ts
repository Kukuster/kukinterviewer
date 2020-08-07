import { turnQuestionsOnOff_testCases } from "./turnQuestionsOnOff_testCases";
import { test_walk } from "./traverse_a_message";
import { nodeC } from "../../../Interpretation/matchTree/node";
import { turnQuestionsOnOff_tree } from "../../../Interpretation/Commands/turnQuestionsOnOff/matchTree";


const Cs: {[key: string]: {testCases: any, tree: nodeC}} = {
    turn_questions: {testCases: turnQuestionsOnOff_testCases,    tree: turnQuestionsOnOff_tree},

}

for (const c in Cs) {
    console.log(c);
    test_walk(Cs[c].tree, Cs[c].testCases);
};
