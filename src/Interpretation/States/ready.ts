'use strict';

import State from "../../core/State/State";
import { addQuestion_command, addTagsToQuestions_command, askMeAQuestion_command, deleteQuestions_command, listQuestions_command, listTags_command, removeTagsFromQuestions_command, turnQuestionsOnOff_command, turnTagsOnOff_command } from "../Commands";

export default new State('ready', [
            listQuestions_command,
              addQuestion_command,
          deleteQuestions_command,
           askMeAQuestion_command,
       turnQuestionsOnOff_command,
                 listTags_command,
            turnTagsOnOff_command,
       addTagsToQuestions_command,
  removeTagsFromQuestions_command,
]);

