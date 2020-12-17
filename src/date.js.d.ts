declare module 'date.js' {
    declare function parser (str: string, offset?: string | Date): Date
    export = parser;
}
