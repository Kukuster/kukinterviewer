'use strict';

import Command from "../core/Command/Command";

import match_byTree from "./Commands/match_byTree";
import display_raw from "./Commands/display_raw";

import { start_tree } from "./Commands/start/matchTree";
import start_prepare from "./Commands/start/prepare";
import start_execute from "./Commands/start/execute";
import start_display from "./Commands/start/display";
import submitTimezone_match from "./Commands/submitTimezone/match";
import submitTimezone_prepare from "./Commands/submitTimezone/prepare";
import submitTimezone_execute from "./Commands/submitTimezone/execute";
import submitTimezone_display from "./Commands/submitTimezone/display";
import { listQuestions_tree } from "./Commands/listQuestions/matchTree";
import listQuestions_prepare from "./Commands/listQuestions/prepare";
import listQuestions_execute from "./Commands/listQuestions/execute";
import listQuestions_display from "./Commands/listQuestions/display";
import { addQuestion_tree } from "./Commands/addQuestion/matchTree";
import addQuestion_prepare from "./Commands/addQuestion/prepare";
import addQuestion_execute from "./Commands/addQuestion/execute";
import addQuestion_display from "./Commands/addQuestion/display";
import { deleteQuestions_tree } from "./Commands/deleteQuestions/matchTree";
import deleteQuestions_prepare from "./Commands/deleteQuestions/prepare";
import deleteQuestions_execute from "./Commands/deleteQuestions/execute";
import deleteQuestions_display from "./Commands/deleteQuestions/display";
import { askMeAQuestion_tree } from "./Commands/askMeAQuestion/matchTree";
import askMeAQuestion_prepare from "./Commands/askMeAQuestion/prepare";
import askMeAQuestion_execute from "./Commands/askMeAQuestion/execute";
import askMeAQuestion_display from "./Commands/askMeAQuestion/display";
import { turnQuestionsOnOff_tree } from "./Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_prepare from "./Commands/turnQuestionsOnOff/prepare";
import turnQuestionsOnOff_execute from "./Commands/turnQuestionsOnOff/execute";
import turnQuestionsOnOff_display from "./Commands/turnQuestionsOnOff/display";
import { listTags_tree } from "./Commands/listTags/matchTree";
import listTags_prepare from "./Commands/listTags/prepare";
import listTags_execute from "./Commands/listTags/execute";
import listTags_display from "./Commands/listTags/display";
import { turnTagsOnOff_tree } from "./Commands/turnTagsOnOff/matchTree";
import turnTagsOnOff_prepare from "./Commands/turnTagsOnOff/prepare";
import turnTagsOnOff_execute from "./Commands/turnTagsOnOff/execute";
import { addTagsToQuestions_tree } from "./Commands/addTagsToQuestions/matchTree";
import addTagsToQuestions_prepare from "./Commands/addTagsToQuestions/prepare";
import addTagsToQuestions_execute from "./Commands/addTagsToQuestions/execute";
import { removeTagsFromQuestions_tree } from "./Commands/removeTagsFromQuestions/matchTree";
import removeTagsFromQuestions_prepare from "./Commands/removeTagsFromQuestions/prepare";
import removeTagsFromQuestions_execute from "./Commands/removeTagsFromQuestions/execute";
import { setAskingTime_tree } from "./Commands/setAskingTime/matchTree";
import setAskingTime_prepare from "./Commands/setAskingTime/prepare";
import setAskingTime_execute from "./Commands/setAskingTime/execute";
import { turnAskingOnOff_tree } from "./Commands/turnAskingOnOff/matchTree";
import turnAskingOnOff_prepare from "./Commands/turnAskingOnOff/prepare";
import turnAskingOnOff_execute from "./Commands/turnAskingOnOff/execute";


import suggestMethod_test_match from "./Commands/suggestMethod_test/match";
import suggestMethod_test_prepare from "./Commands/suggestMethod_test/prepare";
import suggestMethod_test_execute from "./Commands/suggestMethod_test/execute";
import suggestMethod_test_display from "./Commands/suggestMethod_test/display";

import { confirm_tree } from "./Commands/confirm/matchTree";
import confirm_prepare from "./Commands/confirm/prepare";
import confirm_execute from "./Commands/confirm/execute";
import confirm_display from "./Commands/confirm/display";

import { submitQuestionText_tree } from "./Commands/submitQuestionText/matchTree";
import submitQuestionText_prepare from "./Commands/submitQuestionText/prepare";
import submitQuestionText_execute from "./Commands/submitQuestionText/execute";
import submitQuestionText_display from "./Commands/submitQuestionText/display";



Command.default_display = display_raw;



// GREET State //

export const start_command = new Command(
    match_byTree(start_tree),
    start_prepare,
    start_execute,
    start_display,
);


// ASKING FOR TIMEZONE State //

export const submitTimezone_command = new Command(
    submitTimezone_match,
    submitTimezone_prepare,
    submitTimezone_execute, 
    submitTimezone_display,
);


// READY State //

export const listQuestions_command = new Command(
    match_byTree(listQuestions_tree, {unmatchesInRow:20}),
    listQuestions_prepare,
    listQuestions_execute,
    listQuestions_display,
);
export const addQuestion_command = new Command(
    match_byTree(addQuestion_tree,{chars:'max', unmatchesInRow:20}),
    addQuestion_prepare,
    addQuestion_execute,
    addQuestion_display,
);
export const deleteQuestions_command = new Command(
    match_byTree(deleteQuestions_tree, {unmatchesInRow:20}),
    deleteQuestions_prepare,
    deleteQuestions_execute,
    deleteQuestions_display,
);
export const askMeAQuestion_command = new Command(
    match_byTree(askMeAQuestion_tree, {unmatchesInRow:20}),
    askMeAQuestion_prepare,
    askMeAQuestion_execute,
    askMeAQuestion_display,
);
export const turnQuestionsOnOff_command = new Command(
    match_byTree(turnQuestionsOnOff_tree, {unmatchesInRow:20}),
    turnQuestionsOnOff_prepare,
    turnQuestionsOnOff_execute,
    turnQuestionsOnOff_display,
);
export const listTags_command = new Command(
    match_byTree(listTags_tree, {unmatchesInRow:20}),
    listTags_prepare,
    listTags_execute,
    listTags_display,
);
export const turnTagsOnOff_command = new Command(
    match_byTree(turnTagsOnOff_tree, {unmatchesInRow:20}),
    turnTagsOnOff_prepare,
    turnTagsOnOff_execute,
);
export const addTagsToQuestions_command = new Command(
    match_byTree(addTagsToQuestions_tree, {unmatchesInRow:20}),
    addTagsToQuestions_prepare,
    addTagsToQuestions_execute,
);
export const removeTagsFromQuestions_command = new Command(
    match_byTree(removeTagsFromQuestions_tree, {unmatchesInRow:20}),
    removeTagsFromQuestions_prepare,
    removeTagsFromQuestions_execute,
);
export const setAskingTime_command = new Command(
    match_byTree(setAskingTime_tree, {unmatchesInRow:20}),
    setAskingTime_prepare,
    setAskingTime_execute,
);
export const turnAskingOnOff_command = new Command(
    match_byTree(turnAskingOnOff_tree, {unmatchesInRow:20}),
    turnAskingOnOff_prepare,
    turnAskingOnOff_execute,
);

export const suggestMethod_test_command = new Command(
    suggestMethod_test_match,
    suggestMethod_test_prepare,
    suggestMethod_test_execute,
    suggestMethod_test_display,
);



// PENDING CONFIRMATION State //

export const confirm_command = new Command(
    match_byTree(confirm_tree, {unmatchesInRow:20}),
    confirm_prepare,
    confirm_execute,
    confirm_display,
);



// AWAITING QUESTIONTEXT State //

export const submitQuestionText_command = new Command(
    match_byTree(submitQuestionText_tree,{chars:Infinity}),
    submitQuestionText_prepare,
    submitQuestionText_execute,
    submitQuestionText_display,
);


