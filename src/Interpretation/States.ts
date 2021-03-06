'use strict';

import { ArrayElement } from "../reusable/ArrayElement.type";
import greet from "./States/greet";
import askingForTimezone from "./States/askingForTimezone";
import ready from "./States/ready";
import awaitingQuestionText from "./States/awaitingQuestionText";
import pendingConfirmation from "./States/pendingConfirmation";

/**
 * Array of `State`s supported by the app.
 * Each `State` has a string identifier and an array of Commands for bot to check for when in this state
 */
const States = [
    greet,
    askingForTimezone,
    ready,

    awaitingQuestionText,
    pendingConfirmation,
] as const;

export default States;

/**
 * a State that is assumed by default if a user has no chat document in the DB (thus doesn't have chat.state entry)
 */
export const defaultState = greet;

export type oneOfTheStates = ArrayElement<typeof States>

export type validStateName = oneOfTheStates["name"]
