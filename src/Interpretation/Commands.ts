'use strict';

import Command from "../core/Command/Command";
import display_raw from "./Commands/display_raw";
import start_match from "./Commands/start/match";
import start_prepare from "./Commands/start/prepare";
import start_execute from "./Commands/start/execute";
import listQuestions_match from "./Commands/listQuestions/match";
import listQuestions_prepare from "./Commands/listQuestions/prepare";
import listQuestions_execute from "./Commands/listQuestions/execute";
import addQuestion_match from "./Commands/addQuestion/match";
import addQuestion_prepare from "./Commands/addQuestion/prepare";
import addQuestion_execute from "./Commands/addQuestion/execute";
import deleteQuestions_match from "./Commands/deleteQuestions/match";
import deleteQuestions_prepare from "./Commands/deleteQuestions/prepare";
import deleteQuestions_execute from "./Commands/deleteQuestions/execute";
import askMeAQuestion_match from "./Commands/askMeAQuestion/match";
import askMeAQuestion_prepare from "./Commands/askMeAQuestion/prepare";
import askMeAQuestion_execute from "./Commands/askMeAQuestion/execute";
import turnQuestionsOnOff_match from "./Commands/turnQuestionsOnOff/match";
import turnQuestionsOnOff_prepare from "./Commands/turnQuestionsOnOff/prepare";
import turnQuestionsOnOff_execute from "./Commands/turnQuestionsOnOff/execute";
import listTags_match from "./Commands/listTags/match";
import listTags_prepare from "./Commands/listTags/prepare";
import listTags_execute from "./Commands/listTags/execute";
import turnTagsOnOff_match from "./Commands/turnTagsOnOff/match";
import turnTagsOnOff_prepare from "./Commands/turnTagsOnOff/prepare";
import turnTagsOnOff_execute from "./Commands/turnTagsOnOff/execute";
import addTagsToQuestions_match from "./Commands/addTagsToQuestions/match";
import addTagsToQuestions_prepare from "./Commands/addTagsToQuestions/prepare";
import addTagsToQuestions_execute from "./Commands/addTagsToQuestions/execute";
import removeTagsFromQuestions_match from "./Commands/removeTagsFromQuestions/match";
import removeTagsFromQuestions_prepare from "./Commands/removeTagsFromQuestions/prepare";
import removeTagsFromQuestions_execute from "./Commands/removeTagsFromQuestions/execute";
import setAskingTime_match from "./Commands/setAskingTime/match";
import setAskingTime_prepare from "./Commands/setAskingTime/prepare";
import setAskingTime_execute from "./Commands/setAskingTime/execute";

import suggestMethod_test_match from "./Commands/suggestMethod_test/match";
import suggestMethod_test_prepare from "./Commands/suggestMethod_test/prepare";
import suggestMethod_test_execute from "./Commands/suggestMethod_test/execute";
import suggestMethod_test_display from "./Commands/suggestMethod_test/display";

import confirm_match from "./Commands/confirm/match";
import confirm_prepare from "./Commands/confirm/prepare";
import confirm_execute from "./Commands/confirm/execute";
import confirm_display from "./Commands/confirm/display";

import submitQuestionText_match from "./Commands/submitQuestionText/match";
import submitQuestionText_prepare from "./Commands/submitQuestionText/prepare";
import submitQuestionText_execute from "./Commands/submitQuestionText/execute";


Command.default_display = display_raw;



// GREET State //

export const start_command = new Command(start_match, start_prepare, start_execute);



// READY State //

export const           listQuestions_command = new Command(           listQuestions_match,           listQuestions_prepare,           listQuestions_execute);
export const             addQuestion_command = new Command(             addQuestion_match,             addQuestion_prepare,             addQuestion_execute);
export const         deleteQuestions_command = new Command(         deleteQuestions_match,         deleteQuestions_prepare,         deleteQuestions_execute);
export const          askMeAQuestion_command = new Command(          askMeAQuestion_match,          askMeAQuestion_prepare,          askMeAQuestion_execute);
export const      turnQuestionsOnOff_command = new Command(      turnQuestionsOnOff_match,      turnQuestionsOnOff_prepare,      turnQuestionsOnOff_execute);
export const                listTags_command = new Command(                listTags_match,                listTags_prepare,                listTags_execute);
export const           turnTagsOnOff_command = new Command(           turnTagsOnOff_match,           turnTagsOnOff_prepare,           turnTagsOnOff_execute);
export const      addTagsToQuestions_command = new Command(      addTagsToQuestions_match,      addTagsToQuestions_prepare,      addTagsToQuestions_execute);
export const removeTagsFromQuestions_command = new Command( removeTagsFromQuestions_match, removeTagsFromQuestions_prepare, removeTagsFromQuestions_execute);
export const           setAskingTime_command = new Command(           setAskingTime_match,           setAskingTime_prepare,           setAskingTime_execute);

export const      suggestMethod_test_command = new Command(      suggestMethod_test_match,      suggestMethod_test_prepare,      suggestMethod_test_execute,      suggestMethod_test_display);



// PENDING CONFIRMATION State //

export const confirm_command = new Command(confirm_match, confirm_prepare, confirm_execute, confirm_display);



// AWAITING QUESTIONTEXT State //

export const submitQuestionText_command = new Command(submitQuestionText_match, submitQuestionText_prepare, submitQuestionText_execute);


