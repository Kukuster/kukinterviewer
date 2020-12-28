'use strict';
/**
 * circularly referencing types allowed since TypeScript v3.7
 * https://dev.to/busypeoples/notes-on-typescript-recursive-types-and-immutability-5ck1
 *
 */
export type anyJSONvalue = string | number | { [key: string]: anyJSONvalue } | boolean | null | anyJSONvalue[];

export type anyJSONobject= { [key in string | number]: anyJSONvalue };
