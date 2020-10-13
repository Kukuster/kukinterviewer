'use strict';

import Command from "../core/Command/Command";
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


// GREET State //

export const start_command = new Command(start_match, start_prepare, start_execute);



// READY State //

export const   listQuestions_command = new Command(listQuestions_match,   listQuestions_prepare,   listQuestions_execute);

export const     addQuestion_command = new Command(addQuestion_match,     addQuestion_prepare,     addQuestion_execute);

export const deleteQuestions_command = new Command(deleteQuestions_match, deleteQuestions_prepare, deleteQuestions_execute);
