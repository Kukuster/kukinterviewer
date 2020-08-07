import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const rootRE = /[\s\S]+/g;
const anyText = /^[\S]+$/g;

const add = /^(add|new|create|insert|submit)[\?\!\.,;:]*$/i;
const question = /^question[\?\!\.,;:]*$/i;
const newline = /[\r\n]+/i;

//double quote
const dquoteOpen  = /^[\?\!\.,;:]*"(\S)*$/i;
const dquoteClose = /^(\S)*"[\?\!\.,;:]*$/i;

//single quote
const squoteOpen  = /^[\?\!\.,;:]*'(\S)*$/i;
const squoteClose = /^(\S)*'[\?\!\.,;:]*$/i;

//telegram quote
const tquoteOpen  = /^[\?\!\.,;:]*«(\S)*$/i;
const tquoteClose = /^(\S)*»[\?\!\.,;:]*$/i;

//angle brackets quote
const aquoteOpen  = /^[\?\!\.,;:]*<<(\S)*$/i;
const aquoteClose = /^(\S)*>>[\?\!\.,;:]*$/i;



//forbidden words
const frb = /^(erase|remove|turn|delete|eliminate|destroy|drop|wipe|withdraw|enable|disable|dismiss)[\?\!\.,;:]*$/i;

// negation
const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;


/**
 * @property cutMatches - number of nodes in path to cut the text to (cuts up to the question text or an opening quote)
 * @property quotes - which characters are used as quotes
 */
export type shoot = { cutMatches: number, quotes?: 'double'|'single'|'tg'|'angle' };


let addQuestionChildren: nodeLike[];


export const addQuestion_tree =
node(rootRE, [

    node(add, [
        node(question, addQuestionChildren = [

            node(newline, [
                node(dquoteOpen, [
                    node(anyText, [
                        node(dquoteClose, [], {cutMatches:3,quotes:'double'} as shoot),
                        SELF,
                    ]),
                ]),
                node(squoteOpen, [
                    node(anyText, [
                        node(squoteClose, [], {cutMatches:3,quotes:'single'} as shoot),
                        SELF,
                    ]),
                ]),
                node(tquoteOpen, [
                    node(anyText, [
                        node(tquoteClose, [], {cutMatches:3,quotes:'tg'} as shoot),
                        SELF,
                    ]),
                ]),
                node(aquoteOpen, [
                    node(anyText, [
                        node(aquoteClose, [], {cutMatches:3,quotes:'angle'} as shoot),
                        SELF,
                    ]),
                ]),

                node(anyText, [], {cutMatches:3} as shoot),
            ]),

            // add -> question ->
            node(dquoteOpen, [
                node(anyText, [
                    node(dquoteClose, [], {cutMatches:2,quotes:'double'} as shoot),
                    SELF,
                ]),
            ]),
            node(squoteOpen, [
                node(anyText, [
                    node(squoteClose, [], {cutMatches:2,quotes:'single'} as shoot),
                    SELF,
                ]),
            ]),
            node(tquoteOpen, [
                node(anyText, [
                    node(tquoteClose, [], {cutMatches:2,quotes:'tg'} as shoot),
                    SELF,
                ]),
            ]),
            node(aquoteOpen, [
                node(anyText, [
                    node(aquoteClose, [], {cutMatches:2,quotes:'angle'} as shoot),
                    SELF,
                ]),
            ]),

            
            // add -> question
            node(frb, []),
            node(neg, [])

        ]), // add -> question
        
        // add -> 
        node(frb, []),
        node(neg, [])
    ]), // add


    node(question, [
        node(add, addQuestionChildren),
        node(frb, []),
        node(neg, [])
    ]),


    node(frb, []),
    node(neg, [])


]);




