'use strict';

import State from "../../core/State/State";
import { submitQuestionText_command } from "../Commands";

export default new State('awaiting questionText', [submitQuestionText_command]);

