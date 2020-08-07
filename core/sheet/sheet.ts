'use strict';

import hasChat from "./methods/chat/hasChat";
import createNewChat from "./methods/chat/createNewChat";
import deleteChat from "./methods/chat/deleteChat";
import getChat from "./methods/chat/getChat";

import addQuestion from "./methods/questions/addQuestion";
import getQuestions from "./methods/questions/getQuestions";
import deleteQuestions from "./methods/questions/deleteQuestions";


/**
 * kukinterviewer Mongoose ORM
 */
class sheet {

    public hasChat = hasChat;
    public createNewChat = createNewChat;
    public deleteChat = deleteChat;
    public getChat = getChat;

    public addQuestion = addQuestion;
    public getQuestions = getQuestions;
    public deleteQuestions = deleteQuestions;



}


export default new sheet();
