import { nodeC } from "../../src/Interpretation/matchTree/node";
import { Command_match, Command_prepare, IIMessage } from "../../src/core/Command/Command";

import { matchTree_testCase } from "../../src/Interpretation/matchTree/extras/matchTree_testCase.type";

import { turnQuestionsOnOff_testCases } from "../../src/Interpretation/Commands/turnQuestionsOnOff/matchTree_testCases";
import { turnQuestionsOnOff_tree }      from "../../src/Interpretation/Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_match         from "../../src/Interpretation/Commands/turnQuestionsOnOff/match";
import turnQuestionsOnOff_prepare       from "../../src/Interpretation/Commands/turnQuestionsOnOff/prepare";

import { start_testCases } from "../../src/Interpretation/Commands/start/matchTree_testCases";
import { start_tree } from "../../src/Interpretation/Commands/start/matchTree";
import start_match from "../../src/Interpretation/Commands/start/match";
import start_prepare from "../../src/Interpretation/Commands/start/prepare";

import { addQuestion_testCases } from "../../src/Interpretation/Commands/addQuestion/matchTree_testCases";
import { addQuestion_tree } from "../../src/Interpretation/Commands/addQuestion/matchTree";
import addQuestion_match from "../../src/Interpretation/Commands/addQuestion/match";
import addQuestion_prepare from "../../src/Interpretation/Commands/addQuestion/prepare";

import { addTagsToQuestions_testCases } from "../../src/Interpretation/Commands/addTagsToQuestions/matchTree_testCases";
import { addTagsToQuestions_tree } from "../../src/Interpretation/Commands/addTagsToQuestions/matchTree";
import addTagsToQuestions_match from "../../src/Interpretation/Commands/addTagsToQuestions/match";
import addTagsToQuestions_prepare from "../../src/Interpretation/Commands/addTagsToQuestions/prepare";

import { askMeAQuestion_testCases } from "../../src/Interpretation/Commands/askMeAQuestion/matchTree_testCases";
import { askMeAQuestion_tree } from "../../src/Interpretation/Commands/askMeAQuestion/matchTree";
import askMeAQuestion_match from "../../src/Interpretation/Commands/askMeAQuestion/match";
import askMeAQuestion_prepare from "../../src/Interpretation/Commands/askMeAQuestion/prepare";

import { deleteQuestions_testCases } from "../../src/Interpretation/Commands/deleteQuestions/matchTree_testCases";
import { deleteQuestions_tree } from "../../src/Interpretation/Commands/deleteQuestions/matchTree";
import deleteQuestions_match from "../../src/Interpretation/Commands/deleteQuestions/match";
import deleteQuestions_prepare from "../../src/Interpretation/Commands/deleteQuestions/prepare";

import { listQuestions_testCases } from "../../src/Interpretation/Commands/listQuestions/matchTree_testCases";
import { listQuestions_tree } from "../../src/Interpretation/Commands/listQuestions/matchTree";
import listQuestions_match from "../../src/Interpretation/Commands/listQuestions/match";
import listQuestions_prepare from "../../src/Interpretation/Commands/listQuestions/prepare";

import { removeTagsFromQuestions_testCases } from "../../src/Interpretation/Commands/removeTagsFromQuestions/matchTree_testCases";
import { removeTagsFromQuestions_tree } from "../../src/Interpretation/Commands/removeTagsFromQuestions/matchTree";
import removeTagsFromQuestions_match from "../../src/Interpretation/Commands/removeTagsFromQuestions/match";
import removeTagsFromQuestions_prepare from "../../src/Interpretation/Commands/removeTagsFromQuestions/prepare";

import { listTags_testCases } from "../../src/Interpretation/Commands/listTags/matchTree_testCases";
import { listTags_tree } from "../../src/Interpretation/Commands/listTags/matchTree";
import listTags_match from "../../src/Interpretation/Commands/listTags/match";
import listTags_prepare from "../../src/Interpretation/Commands/listTags/prepare";

import { turnTagsOnOff_testCases } from "../../src/Interpretation/Commands/turnTagsOnOff/matchTree_testCases";
import { turnTagsOnOff_tree } from "../../src/Interpretation/Commands/turnTagsOnOff/matchTree";
import turnTagsOnOff_match from "../../src/Interpretation/Commands/turnTagsOnOff/match";
import turnTagsOnOff_prepare from "../../src/Interpretation/Commands/turnTagsOnOff/prepare";



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
        testCases: start_testCases.filter(tc => tc.res !== null),
        tree: start_tree,
        matchfunc: start_match,
        prepfunc: start_prepare
    },

    turnQuestionsOnOff: {
        testCases: turnQuestionsOnOff_testCases.filter(tc => tc.res !== null),
        tree: turnQuestionsOnOff_tree,
        matchfunc: turnQuestionsOnOff_match,
        prepfunc: turnQuestionsOnOff_prepare
    },

    addQuestion: {
        testCases: addQuestion_testCases.filter(tc => tc.res !== null),
        tree: addQuestion_tree,
        matchfunc: addQuestion_match,
        prepfunc: addQuestion_prepare
    },

    addTagsToQuestions: {
        testCases: addTagsToQuestions_testCases.filter(tc => tc.res !== null),
        tree: addTagsToQuestions_tree,
        matchfunc: addTagsToQuestions_match,
        prepfunc: addTagsToQuestions_prepare
    },

    askMeAQuestion: {
        testCases: askMeAQuestion_testCases.filter(tc => tc.res !== null),
        tree: askMeAQuestion_tree,
        matchfunc: askMeAQuestion_match,
        prepfunc: askMeAQuestion_prepare
    },

    deleteQuestions: {
        testCases: deleteQuestions_testCases.filter(tc => tc.res !== null),
        tree: deleteQuestions_tree,
        matchfunc: deleteQuestions_match,
        prepfunc: deleteQuestions_prepare
    },

    listQuestions: {
        testCases: listQuestions_testCases.filter(tc => tc.res !== null),
        tree: listQuestions_tree,
        matchfunc: listQuestions_match,
        prepfunc: listQuestions_prepare
    },

    removeTagsFromQuestions: {
        testCases: removeTagsFromQuestions_testCases.filter(tc => tc.res !== null),
        tree: removeTagsFromQuestions_tree,
        matchfunc: removeTagsFromQuestions_match,
        prepfunc: removeTagsFromQuestions_prepare
    },

    listTags: {
        testCases: listTags_testCases.filter(tc => tc.res !== null),
        tree: listTags_tree,
        matchfunc: listTags_match,
        prepfunc: listTags_prepare
    },

    turnTagsOnOff: {
        testCases: turnTagsOnOff_testCases.filter(tc => tc.res !== null),
        tree: turnTagsOnOff_tree,
        matchfunc: turnTagsOnOff_match,
        prepfunc: turnTagsOnOff_prepare
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
    return path ? await prepfunc(msg, path) : null;
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


const Cs_got_res: { [key: string]: { [key: string]: any[] } } = {

};

beforeAll(async () => {
    for (const c in Cs) {
        Cs_got_res[c] = {};
        for (const against_c in Cs){
            if (against_c === c)
                continue;
            Cs_got_res[c][against_c] = await traverseAllTestCases(Cs[c].tree, Cs[against_c].testCases, Cs[c].matchfunc, Cs[c].prepfunc);
        };
    };
});




////////////////////////////////////////////////////////
///////////                                  ///////////
///////////             Run Test             ///////////
///////////                                  ///////////
////////////////////////////////////////////////////////



for (const c in Cs) {
    for (const against_c in Cs){
        if (against_c === c)
            continue;

        const casesLen = Cs[against_c].testCases.length;

        for (let i = 0; i < casesLen; i++) {
            test(c + '.matchTree against ' + against_c + ' message #' + (i + 1) + ': "' + Cs[against_c].testCases[i].m + '": ', () => {
                expect(
                    Cs_got_res[c][against_c][i]
                ).toEqual(
                    null
                );
            });
        };

    };

};

