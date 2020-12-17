'use strict';

import Command from "../core/Command/Command";

import match_byTree from "./Commands/match_byTree";
import display_raw from "./Commands/display_raw";

import { start_tree } from "./Commands/start/matchTree";
import start_prepare from "./Commands/start/prepare";
import start_execute from "./Commands/start/execute";
import { listQuestions_tree } from "./Commands/listQuestions/matchTree";
import listQuestions_prepare from "./Commands/listQuestions/prepare";
import listQuestions_execute from "./Commands/listQuestions/execute";
import { addQuestion_tree } from "./Commands/addQuestion/matchTree";
import addQuestion_prepare from "./Commands/addQuestion/prepare";
import addQuestion_execute from "./Commands/addQuestion/execute";
import { deleteQuestions_tree } from "./Commands/deleteQuestions/matchTree";
import deleteQuestions_prepare from "./Commands/deleteQuestions/prepare";
import deleteQuestions_execute from "./Commands/deleteQuestions/execute";
import { askMeAQuestion_tree } from "./Commands/askMeAQuestion/matchTree";
import askMeAQuestion_prepare from "./Commands/askMeAQuestion/prepare";
import askMeAQuestion_execute from "./Commands/askMeAQuestion/execute";
import { turnQuestionsOnOff_tree } from "./Commands/turnQuestionsOnOff/matchTree";
import turnQuestionsOnOff_prepare from "./Commands/turnQuestionsOnOff/prepare";
import turnQuestionsOnOff_execute from "./Commands/turnQuestionsOnOff/execute";
import { listTags_tree } from "./Commands/listTags/matchTree";
import listTags_prepare from "./Commands/listTags/prepare";
import listTags_execute from "./Commands/listTags/execute";
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


Command.default_display = display_raw;



// GREET State //

export const start_command = new Command(match_byTree(start_tree), start_prepare, start_execute);



// READY State //

export const           listQuestions_command = new Command(            match_byTree(listQuestions_tree),            listQuestions_prepare,           listQuestions_execute);
export const             addQuestion_command = new Command(              match_byTree(addQuestion_tree),              addQuestion_prepare,             addQuestion_execute);
export const         deleteQuestions_command = new Command(          match_byTree(deleteQuestions_tree),          deleteQuestions_prepare,         deleteQuestions_execute);
export const          askMeAQuestion_command = new Command(           match_byTree(askMeAQuestion_tree),           askMeAQuestion_prepare,          askMeAQuestion_execute);
export const      turnQuestionsOnOff_command = new Command(       match_byTree(turnQuestionsOnOff_tree),       turnQuestionsOnOff_prepare,      turnQuestionsOnOff_execute);
export const                listTags_command = new Command(                 match_byTree(listTags_tree),                 listTags_prepare,                listTags_execute);
export const           turnTagsOnOff_command = new Command(            match_byTree(turnTagsOnOff_tree),            turnTagsOnOff_prepare,           turnTagsOnOff_execute);
export const      addTagsToQuestions_command = new Command(       match_byTree(addTagsToQuestions_tree),       addTagsToQuestions_prepare,      addTagsToQuestions_execute);
export const removeTagsFromQuestions_command = new Command(  match_byTree(removeTagsFromQuestions_tree),  removeTagsFromQuestions_prepare, removeTagsFromQuestions_execute);
export const           setAskingTime_command = new Command(            match_byTree(setAskingTime_tree),            setAskingTime_prepare,           setAskingTime_execute);

export const      suggestMethod_test_command = new Command(                    suggestMethod_test_match,       suggestMethod_test_prepare,      suggestMethod_test_execute,      suggestMethod_test_display);



// PENDING CONFIRMATION State //

export const confirm_command = new Command(match_byTree(confirm_tree), confirm_prepare, confirm_execute, confirm_display);



// AWAITING QUESTIONTEXT State //

export const submitQuestionText_command = new Command(match_byTree(submitQuestionText_tree), submitQuestionText_prepare, submitQuestionText_execute);


