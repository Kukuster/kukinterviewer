import { nodeC } from "../../Interpretation/matchTree/node";
import { Command_match, Command_prepare, IIMessage } from "../../core/Command/Command";

import { matchTree_testCase } from "../../Interpretation/matchTree/matchTree_testCase.type";

import { turnQuestionsOnOff_testCases } from "../../Interpretation/Commands/turnQuestionsOnOff/matchTree_testCases";
import { turnQuestionsOnOff_tree }      from "../../Interpretation/Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_match         from "../../Interpretation/Commands/turnQuestionsOnOff/match";
import turnQuestionsOnOff_prepare       from "../../Interpretation/Commands/turnQuestionsOnOff/prepare";
import { start_testCases } from "../../Interpretation/Commands/start/matchTree_testCases";
import { start_tree } from "../../Interpretation/Commands/start/matchTree";
import start_match from "../../Interpretation/Commands/start/match";
import start_prepare from "../../Interpretation/Commands/start/prepare";
import { addQuestion_testCases } from "../../Interpretation/Commands/addQuestion/matchTree_testCases";
import { addQuestion_tree } from "../../Interpretation/Commands/addQuestion/matchTree";
import addQuestion_match from "../../Interpretation/Commands/addQuestion/match";
import addQuestion_prepare from "../../Interpretation/Commands/addQuestion/prepare";
import { addTagsToQuestions_testCases } from "../../Interpretation/Commands/addTagsToQuestions/matchTree_testCases";
import { addTagsToQuestions_tree } from "../../Interpretation/Commands/addTagsToQuestions/matchTree";
import addTagsToQuestions_match from "../../Interpretation/Commands/addTagsToQuestions/match";
import addTagsToQuestions_prepare from "../../Interpretation/Commands/addTagsToQuestions/prepare";
import { askMeAQuestion_testCases } from "../../Interpretation/Commands/askMeAQuestion/matchTree_testCases";
import { askMeAQuestion_tree } from "../../Interpretation/Commands/askMeAQuestion/matchTree";
import askMeAQuestion_match from "../../Interpretation/Commands/askMeAQuestion/match";
import askMeAQuestion_prepare from "../../Interpretation/Commands/askMeAQuestion/prepare";
import { deleteQuestions_testCases } from "../../Interpretation/Commands/deleteQuestions/matchTree_testCases";
import { deleteQuestions_tree } from "../../Interpretation/Commands/deleteQuestions/matchTree";
import deleteQuestions_match from "../../Interpretation/Commands/deleteQuestions/match";
import deleteQuestions_prepare from "../../Interpretation/Commands/deleteQuestions/prepare";





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////          Test Commands           ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////

/**
 * composes kind of `Command`s with only `match` and `prepare` methods, but also with the corresponding `matchTree` and testCases
 */
const Cs: {[key: string]: {testCases: matchTree_testCase[], tree: nodeC, matchfunc: Command_match<any>, prepfunc: Command_prepare<any,any> }} = {
    
    start: {
        testCases: start_testCases,
        tree: start_tree,
        matchfunc: start_match,
        prepfunc: start_prepare
    },

    turnQuestionsOnOff: {
        testCases: turnQuestionsOnOff_testCases,
        tree: turnQuestionsOnOff_tree,
        matchfunc: turnQuestionsOnOff_match,
        prepfunc: turnQuestionsOnOff_prepare
    },

    addQuestion: {
        testCases: addQuestion_testCases,
        tree: addQuestion_tree,
        matchfunc: addQuestion_match,
        prepfunc: addQuestion_prepare
    },

    addTagsToQuestions: {
        testCases: addTagsToQuestions_testCases,
        tree: addTagsToQuestions_tree,
        matchfunc: addTagsToQuestions_match,
        prepfunc: addTagsToQuestions_prepare
    },

    askMeAQuestion: {
        testCases: askMeAQuestion_testCases,
        tree: askMeAQuestion_tree,
        matchfunc: askMeAQuestion_match,
        prepfunc: askMeAQuestion_prepare
    },

    deleteQuestions: {
        testCases: deleteQuestions_testCases,
        tree: deleteQuestions_tree,
        matchfunc: deleteQuestions_match,
        prepfunc: deleteQuestions_prepare
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


export async function traverseAllTestCases<PrepArgs, ExecArgs>(tree: nodeC, test_cases: matchTree_testCase[], matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs, ExecArgs>) {

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


const Cs_got_res: { [key: string]: any[] } = {

};

beforeAll(async () => {
    for (const c in Cs) {
        Cs_got_res[c] = await traverseAllTestCases(Cs[c].tree, Cs[c].testCases, Cs[c].matchfunc, Cs[c].prepfunc);
    };
});




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Run Test             ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////



for (const c in Cs) {
        
    const casesLen = Cs[c].testCases.length;

    for (let i = 0; i < casesLen; i++){
        test(c+'.matchTree message #'+(i+1)+': "' + Cs[c].testCases[i].m + '": ', () => {
            expect(
                JSON.stringify(Cs_got_res[c][i])
            ).toEqual(
                JSON.stringify(Cs[c].testCases[i].res)
            );
        });

    }

};

