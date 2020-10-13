'use strict';

import State from "../../core/State/State";
import { addQuestion_command, deleteQuestions_command, listQuestions_command } from "../Commands";

export default new State('ready', [listQuestions_command, addQuestion_command, deleteQuestions_command]);

