export type quotesType = 'double quotes' | 'single quotes' | 'tg quotes' | 'angle quotes';



export const dquoteOpen = '"';
export const dquoteClose = '"';

export const squoteOpen = "'";
export const squoteClose = "'";

export const tquoteOpen = "«";
export const tquoteClose = "»";

export const aquoteOpen = "<<";
export const aquoteClose = ">>";



//double quote
export const dquoteOpenRE = /^[?!.,;:]*"(\S)*$/i;
export const dquoteCloseRE = /^(\S)*"[?!.,;:]*$/i;

//single quote
export const squoteOpenRE = /^[?!.,;:]*'(\S)*$/i;
export const squoteCloseRE = /^(\S)*'[?!.,;:]*$/i;

//telegram quote
export const tquoteOpenRE = /^[?!.,;:]*«(\S)*$/i;
export const tquoteCloseRE = /^(\S)*»[?!.,;:]*$/i;

//angle brackets quote
export const aquoteOpenRE = /^[?!.,;:]*<<(\S)*$/i;
export const aquoteCloseRE = /^(\S)*>>[?!.,;:]*$/i;



