/**
 * Splits a string to a successive array of only non-whitespace and only whitespace substrings
 * @param message a string to split
 */
export const splitToWords = (message: string) => message.match(/\S+|\s+/g);