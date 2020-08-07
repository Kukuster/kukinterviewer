import { nodeC } from "../../Interpretation/matchTree/node";
import { Command_match, Command_prepare, IIMessage } from "../../core/Command/Command";

import { turnQuestionsOnOff_testCases } from "../../Interpretation/Commands/turnQuestionsOnOff/matchTree_testCases";
import { turnQuestionsOnOff_tree }      from "../../Interpretation/Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_match         from "../../Interpretation/Commands/turnQuestionsOnOff/match";
import turnQuestionsOnOff_prepare       from "../../Interpretation/Commands/turnQuestionsOnOff/prepare";




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////          Test Commands           ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////

/**
 * composes kind of `Command`s with only `match` and `prepare` methods, but also with the corresponding `matchTree` and testCases
 */
const Cs: {[key: string]: {testCases: any, tree: nodeC, matchfunc: Command_match<any>, prepfunc: Command_prepare<any,any> }} = {
    
    turnQuestionsOnOff: {
        testCases: turnQuestionsOnOff_testCases,
        tree: turnQuestionsOnOff_tree,
        matchfunc: turnQuestionsOnOff_match,
        prepfunc: turnQuestionsOnOff_prepare
    },

};





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Test Kit             ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const mock_telegram_message = (messageText: string): IIMessage => ({
    text: messageText,
    message_id: 222222222,
    date: 333333333,
    chat: {
        id: 444444444,
        type: 'private'
    }
})


async function match_prepare<PrepArgs, ExecArgs>(msg: IIMessage, matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs, ExecArgs>) {
    const path = await matchfunc(msg);
   return path ? await prepfunc (msg, path) : null;
}


export async function traverseAllTestCases<PrepArgs, ExecArgs>(tree: nodeC, test_cases: any[], matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs, ExecArgs>) {

    return Promise.all(test_cases.map((testCase) => {
        const m = testCase.m;
        return match_prepare(mock_telegram_message(m), matchfunc, prepfunc);
    }))

}





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////                Run               ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


for (const c in Cs) {
    
    const Cmd = Cs[c];

    test('test matchTree '+c+'(match, prepare)', async (done) => {
        
        const results = await traverseAllTestCases(Cmd.tree, Cmd.testCases, Cmd.matchfunc, Cmd.prepfunc);

        const casesLen = Cmd.testCases.length;
        for (let i = 0; i < casesLen; i++){
            expect(
                JSON.stringify(results[i])
            ).toEqual(
                JSON.stringify(Cmd.testCases[i].res)
            );
        }

        done();
    });

};

