import { nodeC } from "../../src/Interpretation/matchTree/node";
import { Command_match, Command_prepare } from "../../src/core/Command/Command";
import { IIMessage } from "../../src/bot/botlib";
import MockDate from "mockdate";

import { matchTree_testCase } from "../../src/Interpretation/matchTree/extras/matchTree_testCase.type";

import match_byTree from "../../src/Interpretation/Commands/match_byTree";

import { turnQuestionsOnOff_testCases } from "../../src/Interpretation/Commands/turnQuestionsOnOff/matchTree_testCases";
import { turnQuestionsOnOff_tree }      from "../../src/Interpretation/Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_prepare       from "../../src/Interpretation/Commands/turnQuestionsOnOff/prepare";

import { start_testCases } from "../../src/Interpretation/Commands/start/matchTree_testCases";
import { start_tree } from "../../src/Interpretation/Commands/start/matchTree";
import start_prepare from "../../src/Interpretation/Commands/start/prepare";

import { addQuestion_testCases } from "../../src/Interpretation/Commands/addQuestion/matchTree_testCases";
import { addQuestion_tree } from "../../src/Interpretation/Commands/addQuestion/matchTree";
import addQuestion_prepare from "../../src/Interpretation/Commands/addQuestion/prepare";

import { addTagsToQuestions_testCases } from "../../src/Interpretation/Commands/addTagsToQuestions/matchTree_testCases";
import { addTagsToQuestions_tree } from "../../src/Interpretation/Commands/addTagsToQuestions/matchTree";
import addTagsToQuestions_prepare from "../../src/Interpretation/Commands/addTagsToQuestions/prepare";

import { askMeAQuestion_testCases } from "../../src/Interpretation/Commands/askMeAQuestion/matchTree_testCases";
import { askMeAQuestion_tree } from "../../src/Interpretation/Commands/askMeAQuestion/matchTree";
import askMeAQuestion_prepare from "../../src/Interpretation/Commands/askMeAQuestion/prepare";

import { deleteQuestions_testCases } from "../../src/Interpretation/Commands/deleteQuestions/matchTree_testCases";
import { deleteQuestions_tree } from "../../src/Interpretation/Commands/deleteQuestions/matchTree";
import deleteQuestions_prepare from "../../src/Interpretation/Commands/deleteQuestions/prepare";

import { listQuestions_testCases } from "../../src/Interpretation/Commands/listQuestions/matchTree_testCases";
import { listQuestions_tree } from "../../src/Interpretation/Commands/listQuestions/matchTree";
import listQuestions_prepare from "../../src/Interpretation/Commands/listQuestions/prepare";

import { removeTagsFromQuestions_testCases } from "../../src/Interpretation/Commands/removeTagsFromQuestions/matchTree_testCases";
import { removeTagsFromQuestions_tree } from "../../src/Interpretation/Commands/removeTagsFromQuestions/matchTree";
import removeTagsFromQuestions_prepare from "../../src/Interpretation/Commands/removeTagsFromQuestions/prepare";

import { listTags_testCases } from "../../src/Interpretation/Commands/listTags/matchTree_testCases";
import { listTags_tree } from "../../src/Interpretation/Commands/listTags/matchTree";
import listTags_prepare from "../../src/Interpretation/Commands/listTags/prepare";

import { turnTagsOnOff_testCases } from "../../src/Interpretation/Commands/turnTagsOnOff/matchTree_testCases";
import { turnTagsOnOff_tree } from "../../src/Interpretation/Commands/turnTagsOnOff/matchTree";
import turnTagsOnOff_prepare from "../../src/Interpretation/Commands/turnTagsOnOff/prepare";

import { setAskingTime_testBaseDate_unix, setAskingTime_testCases } from "../../src/Interpretation/Commands/setAskingTime/matchTree_testCases";
import { setAskingTime_tree } from "../../src/Interpretation/Commands/setAskingTime/matchTree";
import setAskingTime_prepare from "../../src/Interpretation/Commands/setAskingTime/prepare";

import { turnAskingOnOff_testCases } from "../../src/Interpretation/Commands/turnAskingOnOff/matchTree_testCases";
import { turnAskingOnOff_tree } from "../../src/Interpretation/Commands/turnAskingOnOff/matchTree";
import turnAskingOnOff_prepare from "../../src/Interpretation/Commands/turnAskingOnOff/prepare";


////////////////////////////////////////////////////////
///////////                                  ///////////
///////////         Tested Commands          ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////

/**
 * composes kind of `Command`s with only `match` and `prepare` methods, but also with the corresponding `matchTree` and testCases
 */
const Cs: {[key: string]: {testCases: matchTree_testCase[], tree: nodeC, matchfunc: Command_match<any>, prepfunc: Command_prepare<any,any> }} = {
    
    start: {
        testCases: start_testCases.filter(tc => tc.res !== null),
        tree: start_tree,
        matchfunc: match_byTree(start_tree, {unmatchesInRow: 20}),
        prepfunc: start_prepare
    },

    turnQuestionsOnOff: {
        testCases: turnQuestionsOnOff_testCases.filter(tc => tc.res !== null),
        tree: turnQuestionsOnOff_tree,
        matchfunc: match_byTree(turnQuestionsOnOff_tree, {unmatchesInRow: 20}),
        prepfunc: turnQuestionsOnOff_prepare
    },

    addQuestion: {
        testCases: addQuestion_testCases.filter(tc => tc.res !== null),
        tree: addQuestion_tree,
        matchfunc: match_byTree(addQuestion_tree, { chars: 'max', unmatchesInRow: 20 }),
        prepfunc: addQuestion_prepare
    },

    addTagsToQuestions: {
        testCases: addTagsToQuestions_testCases.filter(tc => tc.res !== null),
        tree: addTagsToQuestions_tree,
        matchfunc: match_byTree(addTagsToQuestions_tree, {unmatchesInRow: 20}),
        prepfunc: addTagsToQuestions_prepare
    },

    askMeAQuestion: {
        testCases: askMeAQuestion_testCases.filter(tc => tc.res !== null),
        tree: askMeAQuestion_tree,
        matchfunc: match_byTree(askMeAQuestion_tree, {unmatchesInRow: 20}),
        prepfunc: askMeAQuestion_prepare
    },

    deleteQuestions: {
        testCases: deleteQuestions_testCases.filter(tc => tc.res !== null),
        tree: deleteQuestions_tree,
        matchfunc: match_byTree(deleteQuestions_tree, {unmatchesInRow: 20}),
        prepfunc: deleteQuestions_prepare
    },

    listQuestions: {
        testCases: listQuestions_testCases.filter(tc => tc.res !== null),
        tree: listQuestions_tree,
        matchfunc: match_byTree(listQuestions_tree, {unmatchesInRow: 20}),
        prepfunc: listQuestions_prepare
    },

    removeTagsFromQuestions: {
        testCases: removeTagsFromQuestions_testCases.filter(tc => tc.res !== null),
        tree: removeTagsFromQuestions_tree,
        matchfunc: match_byTree(removeTagsFromQuestions_tree, {unmatchesInRow: 20}),
        prepfunc: removeTagsFromQuestions_prepare
    },

    listTags: {
        testCases: listTags_testCases.filter(tc => tc.res !== null),
        tree: listTags_tree,
        matchfunc: match_byTree(listTags_tree, {unmatchesInRow: 20}),
        prepfunc: listTags_prepare
    },

    turnTagsOnOff: {
        testCases: turnTagsOnOff_testCases.filter(tc => tc.res !== null),
        tree: turnTagsOnOff_tree,
        matchfunc: match_byTree(turnTagsOnOff_tree, {unmatchesInRow: 20}),
        prepfunc: turnTagsOnOff_prepare
    },

    setAskingTime: {
        testCases: setAskingTime_testCases,
        tree: setAskingTime_tree,
        matchfunc: match_byTree(setAskingTime_tree, {unmatchesInRow: 20}),
        prepfunc: setAskingTime_prepare
    },
    
    turnAskingOnOff: {
        testCases: turnAskingOnOff_testCases,
        tree: turnAskingOnOff_tree,
        matchfunc: match_byTree(turnAskingOnOff_tree, {unmatchesInRow: 20}),
        prepfunc: turnAskingOnOff_prepare
    },
};





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////    Test Kit (data & functions)   ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////

MockDate.set(setAskingTime_testBaseDate_unix);

const mock_telegram_message = (messageText: string): IIMessage => ({
    text: messageText,
    message_id: 222222222,
    date: setAskingTime_testBaseDate_unix,
    chat: {
        id: 444444444,
        type: 'private'
    }
});


async function match_prepare<PrepArgs, ExecArgs>(msg: IIMessage, matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs, ExecArgs>) {
    const path = await matchfunc(msg);
   return path ? await prepfunc (msg, path) : null;
}


async function traverseAllTestCases<PrepArgs, ExecArgs>(tree: nodeC, test_cases: matchTree_testCase[], matchfunc: Command_match<PrepArgs>, prepfunc: Command_prepare<PrepArgs, ExecArgs>) {

    return Promise.all(test_cases.map((testCase) => {
        const m = testCase.m;
        return match_prepare(mock_telegram_message(m), matchfunc, prepfunc);
    }));

}





////////////////////////////////////////////////////////
///////////                                  ///////////
///////////      Run tested calculations     ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////


const Cs_got_res: { [key: string]: { [key: string]: any[] } } = {

};

beforeAll(async () => {
    for (const c in Cs) {
        Cs_got_res[c] = {};
        for (const against_c in Cs){
            if (against_c === c)
                continue;
            Cs_got_res[c][against_c] = await traverseAllTestCases(Cs[c].tree, Cs[against_c].testCases, Cs[c].matchfunc, Cs[c].prepfunc);
        }
    }
});




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////          Testing results         ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////



for (const c in Cs) {
    for (const against_c in Cs){
        if (against_c === c)
            continue;

        const casesLen = Cs[against_c].testCases.length;

        for (let i = 0; i < casesLen; i++) {
            // removes tests that originally evaluate to null (to test Commands to be nagative only against positive tests of other Commands)
            if (Cs[against_c].testCases[i].res !== null){
                test(`${c}.matchTree against ${against_c} message #${i+1}: "${Cs[against_c].testCases[i].m}"`, () => {
                    expect(
                        Cs_got_res[c][against_c][i]
                    ).toEqual(
                        null
                    );
                });
            }
        }

    }

}
