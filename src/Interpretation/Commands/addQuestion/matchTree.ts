import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";
import { dquoteOpenRE, dquoteCloseRE, squoteOpenRE, squoteCloseRE, tquoteOpenRE, tquoteCloseRE, aquoteOpenRE, aquoteCloseRE, quotesType } from "../../textProcessing/quotes";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
       const root = /[\s\S]+/g;
       const anyText = /^[\S]+$/g;

       const add = /^(add|new|create|insert|submit)[\?\!\.,;:]*$/i;
       const question = /^question[\?\!\.,;:]*$/i;
export const newlineRE = /[\r\n]+/i;
       const tagWord = /^(hash)?tag(s|g?ing|g?ed)?[\?\!\.,;:]*$/i;
       const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;


const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;


//forbidden words
const frb = /^(eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing))[\?\!\.,;:]*$/i;

// negation
const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;


export type delimiterType = quotesType | 'endline';

/**
 * @property quotes - the characters used to separate the actual question text
 */
export type shoot =
    { delimiters: delimiterType | null }
    ;


let addQuestionChildren: nodeLike[];


export const addQuestion_tree =
node(root, [

    node(add, [

        node(tag, [PARENTs_CHILDREN]),

        node(question, addQuestionChildren = [

            // add -> question -> ...
            node(newlineRE, [
                node(dquoteOpenRE, [
                    node(anyText, [
                        node(dquoteCloseRE, [], {delimiters:'double quotes'} as shoot),
                        SELF,
                    ]),
                ]),
                node(squoteOpenRE, [
                    node(anyText, [
                        node(squoteCloseRE, [], {delimiters:'single quotes'} as shoot),
                        SELF,
                    ]),
                ]),
                node(tquoteOpenRE, [
                    node(anyText, [
                        node(tquoteCloseRE, [], {delimiters:'tg quotes'} as shoot),
                        SELF,
                    ]),
                ]),
                node(aquoteOpenRE, [
                    node(anyText, [
                        node(aquoteCloseRE, [], {delimiters:'angle quotes'} as shoot),
                        SELF,
                    ]),
                ]),

                node(anyText, [], {delimiters:'endline'} as shoot),
            ]),

            // add -> question -> ...
            node(dquoteOpenRE, [
                node(anyText, [
                    node(dquoteCloseRE, [], {delimiters:'double quotes'} as shoot),
                    SELF,
                ]),
            ]),
            node(squoteOpenRE, [
                node(anyText, [
                    node(squoteCloseRE, [], {delimiters:'single quotes'} as shoot),
                    SELF,
                ]),
            ]),
            node(tquoteOpenRE, [
                node(anyText, [
                    node(tquoteCloseRE, [], {delimiters:'tg quotes'} as shoot),
                    SELF,
                ]),
            ]),
            node(aquoteOpenRE, [
                node(anyText, [
                    node(aquoteCloseRE, [], {delimiters:'angle quotes'} as shoot),
                    SELF,
                ]),
            ]),

            // add -> question -> ...
            node(tag, [PARENTs_CHILDREN]),
            
            // add -> question -> ...
            node(digit, []),
            node(frb, []),
            node(neg, []),

        ], { delimiters: null } as shoot), // add -> question
        
        // add -> 
        node(digit, []),
        node(frb, []),
        node(neg, [])
    ]), // add


    node(question, [
        node(add, addQuestionChildren),
        node(tag, [PARENTs_CHILDREN]),
        node(digit, []),
        node(frb, []),
        node(neg, [])
    ]),


    node(digit, []),
    node(frb, []),
    node(neg, [])


]);




