import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const add = /^(add(ing|ed)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed))[\?\!\.,;:]*$/i;
const question = /^questions?(\S*)*/i;
const questionDigit = /^questions?[\?\!\.,;:]*(#|№|N|n|@)(\d+)[\?\!\.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
const all = /^(all|each|every)[\?\!\.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging)?[\?\!\.,;:]*$/i;

const set = /^(set(ting)?|mak(e|ing)|let(ting)?|got|made)[\?\!\.,;:]*$/i;


const frb = /^(eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing)|eliminat(e|ing)|destro(y|ing)|drop(ping)?|wip(e|ing)|withdraw(ing)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)?)[\?\!\.,;:]*$/i;

const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;



export type shoot   = { questions: 'all'|'some' };

const qSome  :shoot = { questions: 'some' };
const qAll   :shoot = { questions: 'all' }


let Branch: nodeLike[];


export const addTagsToQuestions_tree =
node(root, [

    node(add, [
        node(tag, [
            SELF,
            node(question, [
                node(digit, [SELF], qSome as shoot),
            ]),

            node(all, [
                node(question, [], qAll as shoot),
            ]),

            // add -> # -> ...
            node(neg, []),
            node(frb, []),
        ]),

        node(question, [
            node(digit, [
                SELF,
                node(tag, [SELF], qSome as shoot),
            ]),

            // add -> question -> ...
            node(neg, []),
            node(frb, []),
        ]),

        // add -> ...
        node(neg, []),
        node(frb, []),

    ]), // add


    node(tagWord, [
        node(question, [
            node(digit, [
                node(tag, [SELF], qSome as shoot),
                SELF
            ]),

            // tagWord -> question -> ...
            node(neg, []),
            node(frb, []),
        ]),


        node(tag, [
            SELF,
            node(all, [
                node(question, [], qAll as shoot)
            ]),

            // tagWord -> # -> ...
            node(neg, []),
            node(frb, []),
        ]),

        node(digit, [
            node(question, [
                node(tag, [SELF], qSome as shoot)
            ]),
            SELF,

            // tagWord -> digit -> ...
            node(neg, []),
            node(frb, []),
        ]),


        // tagWord -> ...
        node(neg, []),
        node(frb, []),

    ]), // tagWord


    node(set, [
        node(question, [
            node(digit, [
                SELF,
                node(tagWord, [
                    node(tag, [SELF], qSome as shoot),
                ]),
            ]),

            // tagWord -> question -> digit -> ...
            node(neg, []),
            node(frb, []),
        ]),
        // tagWord -> question -> ...
        node(neg, []),
        node(frb, []),
    ]),


    node(neg, []),
    node(frb, []),


]);
