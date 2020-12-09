'use strict';

import hasChat from "./methods/chat/hasChat";
import createNewChat from "./methods/chat/createNewChat";
import deleteChat from "./methods/chat/deleteChat";
import getChat from "./methods/chat/getChat";
import getAllChats from "./methods/chat/getAllChats";
import getSettings from "./methods/chat/getSettings";
import setSettings from "./methods/chat/setSettings";

import addQuestion from "./methods/questions/addQuestion";
import getQuestions from "./methods/questions/getQuestions";
import deleteQuestions from "./methods/questions/deleteQuestions";
import addTagsToQuestions from "./methods/questions/addTagsToQuestions";
import removeTagsFromQuestions from "./methods/questions/removeTagsFromQuestions";
import turnQuestionsOnOff from "./methods/questions/turnQuestionsOnOff";

import getTags from "./methods/tags/getTags";
import getTagDocById from "./methods/tags/getTagDocById";
import getTagDocByStr from "./methods/tags/getTagDocByStr";
import turnTagsOnOff from "./methods/tags/turnTagsOnOff";

import denyPendingMethod from "./methods/pending_method/denyPendingMethod";
import askForQuestionText from "./methods/awaiting_questionText/askForQuestionText";
import getAwaitingQuestionTags from "./methods/awaiting_questionText/getAwaitingQuestionTags";

import { ArrayElement } from "../../reusable/ArrayElement.type";
import excludeFromTypedArray from "../../reusable/excludeFromTypedArray";


/**
 * kukinterviewer Mongoose ORM
 */
class sheet {

    public hasChat = hasChat;
    public createNewChat = createNewChat;
    public deleteChat = deleteChat;
    public getChat = getChat;
    public getAllChats = getAllChats;
    public getSettings = getSettings;
    public setSettings = setSettings;

    public addQuestion = addQuestion;
    public getQuestions = getQuestions;
    public deleteQuestions = deleteQuestions;
    public addTagsToQuestions = addTagsToQuestions;
    public removeTagsFromQuestions = removeTagsFromQuestions;
    public turnQuestionsOnOff = turnQuestionsOnOff;

    public getTags = getTags;
    public turnTagsOnOff = turnTagsOnOff;

    public denyPendingMethod = denyPendingMethod;
    public askForQuestionText = askForQuestionText;
    public getAwaitingQuestionTags = getAwaitingQuestionTags;
    

}


export default new sheet();




/**
 *
 * EXCEPTIONS LIST
 * The tuple of all sheet methods that ARE NOT allowed to be serialized with its arguments
 *
 */
export const nonConfirmableSheetMethods = ['getAllChats'] as const;




/**
 * The array of names of all sheet methods
 */
export const sheetMethods = Object.keys(new sheet()) as Array<keyof sheet>;


/**
 * The array of names of sheet methods that ARE allowed to be serialized with its arguments
 */
export const confirmableSheetMethods = excludeFromTypedArray(sheetMethods, nonConfirmableSheetMethods);



/**
 * a sheet methods
 */
export type aSheetMethod = ArrayElement<typeof sheetMethods>;

/**
 * a name of a sheet method that IS NOT allowed to be serialized with its arguments
 */
export type nonConfirmableSheetMethod = typeof nonConfirmableSheetMethods;

/**
 * a name of a sheet method that IS allowed to be serialized with its arguments
 */
export type confirmableSheetMethod = Exclude < keyof sheet, ArrayElement<typeof nonConfirmableSheetMethods> >;

/**
 * a union of ReturnTypes of sheet methods that ARE allowed to be serialized with its arguments
 */
export type confirmableSheetMethod_returnType = ReturnType<sheet[confirmableSheetMethod]>;


/**
 * determines whether `sheetMethod` is a `confirmableSheetMethod`
 * @param {string} sheetMethod a string
 * @returns {sheetMethod is confirmableSheetMethod} whether a `sheetMethod` string is a `confirmableSheetMethod`
 */
export const is_confirmableSheetMethod = function(sheetMethod: string): sheetMethod is confirmableSheetMethod {
    return confirmableSheetMethods.some(e => e === sheetMethod);
};
