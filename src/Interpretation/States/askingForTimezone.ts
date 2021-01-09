'use strict';

import State from "../../core/State/State";
import { submitTimezone_command } from "../Commands";

export default new State('asking for timezone', [submitTimezone_command]);

