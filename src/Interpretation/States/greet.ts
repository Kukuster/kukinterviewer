'use strict';

import State from "../../core/State/State";
import { start_command } from "../Commands";

export default new State('greet', [start_command]);

