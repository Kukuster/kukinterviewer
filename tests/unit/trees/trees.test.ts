import { testWalk } from "./traverse_a_message";
import { nodeC } from "../../../Interpretation/matchTree/node";
import { Command_match, Command_prepare } from "../../../core/Command/Command";
import { turnQuestionsOnOff_testCases } from "./turnQuestionsOnOff_testCases";
import { turnQuestionsOnOff_tree } from "../../../Interpretation/Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_match from "../../../Interpretation/Commands/turnQuestionsOnOff/match";
import turnQuestionsOnOff_prepare from "../../../Interpretation/Commands/turnQuestionsOnOff/prepare";


const Cs: {[key: string]: {testCases: any, tree: nodeC, matchfunc: Command_match<any>, prepfunc: Command_prepare<any,any> }} = {
    turnQuestionsOnOff: {
        testCases: turnQuestionsOnOff_testCases,    tree: turnQuestionsOnOff_tree,
        matchfunc: turnQuestionsOnOff_match, prepfunc: turnQuestionsOnOff_prepare },

};


for (const c in Cs) {
    test('test trees '+c+'(match, prepare)', async (done) => {
        const results = await testWalk(Cs[c].tree, Cs[c].testCases, Cs[c].matchfunc, Cs[c].prepfunc);
        const casesLen = Cs[c].testCases.length;
        for (let i = 0; i < casesLen; i++){
            expect(JSON.stringify(results[i])).toEqual(JSON.stringify(Cs[c].testCases[i].res));
        }
        done();
    });
};

