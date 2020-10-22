import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


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


//double quote
export const dquoteOpenRE  = /^[\?\!\.,;:]*"(\S)*$/i;
export const dquoteCloseRE = /^(\S)*"[\?\!\.,;:]*$/i;

//single quote
export const squoteOpenRE  = /^[\?\!\.,;:]*'(\S)*$/i;
export const squoteCloseRE = /^(\S)*'[\?\!\.,;:]*$/i;

//telegram quote
export const tquoteOpenRE  = /^[\?\!\.,;:]*«(\S)*$/i;
export const tquoteCloseRE = /^(\S)*»[\?\!\.,;:]*$/i;

//angle brackets quote
export const aquoteOpenRE  = /^[\?\!\.,;:]*<<(\S)*$/i;
export const aquoteCloseRE = /^(\S)*>>[\?\!\.,;:]*$/i;



//forbidden words
const frb = /^(eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing))[\?\!\.,;:]*$/i;

// negation
const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;


/**
 * @property quotes - the characters used to separate the actual question text
 */
export type shoot = { quotes: 'double'|'single'|'tg'|'angle'|'noQuotes_butAnEndline' };


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
                        node(dquoteCloseRE, [], {quotes:'double'} as shoot),
                        SELF,
                    ]),
                ]),
                node(squoteOpenRE, [
                    node(anyText, [
                        node(squoteCloseRE, [], {quotes:'single'} as shoot),
                        SELF,
                    ]),
                ]),
                node(tquoteOpenRE, [
                    node(anyText, [
                        node(tquoteCloseRE, [], {quotes:'tg'} as shoot),
                        SELF,
                    ]),
                ]),
                node(aquoteOpenRE, [
                    node(anyText, [
                        node(aquoteCloseRE, [], {quotes:'angle'} as shoot),
                        SELF,
                    ]),
                ]),

                node(anyText, [], {quotes:'noQuotes_butAnEndline'} as shoot),
            ]),

            // add -> question -> ...
            node(dquoteOpenRE, [
                node(anyText, [
                    node(dquoteCloseRE, [], {quotes:'double'} as shoot),
                    SELF,
                ]),
            ]),
            node(squoteOpenRE, [
                node(anyText, [
                    node(squoteCloseRE, [], {quotes:'single'} as shoot),
                    SELF,
                ]),
            ]),
            node(tquoteOpenRE, [
                node(anyText, [
                    node(tquoteCloseRE, [], {quotes:'tg'} as shoot),
                    SELF,
                ]),
            ]),
            node(aquoteOpenRE, [
                node(anyText, [
                    node(aquoteCloseRE, [], {quotes:'angle'} as shoot),
                    SELF,
                ]),
            ]),

            // add -> question -> ...
            node(tag, [PARENTs_CHILDREN]),
            
            // add -> question -> ...
            node(frb, []),
            node(neg, []),

        ]), // add -> question
        
        // add -> 
        node(frb, []),
        node(neg, [])
    ]), // add


    node(question, [
        node(add, addQuestionChildren),
        node(tag, [PARENTs_CHILDREN]),
        node(frb, []),
        node(neg, [])
    ]),


    node(frb, []),
    node(neg, [])


]);




