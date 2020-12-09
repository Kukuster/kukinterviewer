/* eslint-disable */
'use strict';

import sheet from "../sheet";


/**
 * 
 * Executes a given sheet method with a given serialized string of arguments object.
 * This function was decided to be implemented in JS due to a design limitation of TypeScript:
 * https://github.com/microsoft/TypeScript/issues/33591
 * 
 * @param {number} chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param {confirmableSheetMethod} method one of the sheet methods name of those which are allowed
 * @param {string} args_serialized arguments for the sheet `method`, starting from the second (excluding first, `chatId`)
 * @state may leave unchanged or set to any state, depends on the method called
 * @returns {Promise<{}>} promise of some response object
 * 
 */
export default async function executeMethod(chatId, method, args_serialized) {
    return await sheet[method](chatId, JSON.parse(args_serialized));
}
