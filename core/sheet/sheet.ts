'use strict';

import hasChat from "./methods/chat/hasChat";
import createNewChat from "./methods/chat/createNewChat";
import deleteChat from "./methods/chat/deleteChat";
import getChat from "./methods/chat/getChat";
import getSettings from "./methods/chat/getSettings";
import setSettings from "./methods/chat/setSettings";

import addQuestion from "./methods/questions/addQuestion";
import getQuestions from "./methods/questions/getQuestions";
import deleteQuestions from "./methods/questions/deleteQuestions";
import addTagsToQuestions from "./methods/questions/addTagsToQuestions";
import removeTagsFromQuestions from "./methods/questions/removeTagsFromQuestions";


/**
 * kukinterviewer Mongoose ORM
 */
class sheet {

    public hasChat = hasChat;
    public createNewChat = createNewChat;
    public deleteChat = deleteChat;
    public getChat = getChat;
    public getSettings = getSettings;
    public setSettings = setSettings;

    public addQuestion = addQuestion;
    public getQuestions = getQuestions;
    public deleteQuestions = deleteQuestions;
    public addTagsToQuestions = addTagsToQuestions;
    public removeTagsFromQuestions = removeTagsFromQuestions;



}


export default new sheet();
