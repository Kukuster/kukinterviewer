'use strict';

import State from "../../core/State/State";
import { confirm_command } from "../Commands";

export default new State('pending confirmation', [confirm_command]);

