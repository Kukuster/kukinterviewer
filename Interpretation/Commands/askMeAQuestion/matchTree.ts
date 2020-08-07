import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const next = /^next[\?\!\.,;:]*$/i;
const question  = /^question[\?\!\.,;:]*$/i;
const questions = /^questions?[\?\!\.,;:]*$/i;
const ask = /^(ask|give)[\?\!\.,;:]*$/i;
const me = /^me[\?\!\.,;:]*$/i;
const anything = /^(anythin(g|')?|somethin(g|')?)[\?\!\.,;:]*$/i;

const a = /^a[\?\!\.,;:]*$/i;
const m = /^m[\?\!\.,;:]*$/i;

const ama = /^[\?\!\.,;:]*a[\?\!\.,;:]*m[\?\!\.,;:]*a[\?\!\.,;:]*$/i;

const another = /^(a?nother?|any)[\?\!\.,;:]*$/i;

const more = /^(more|moar)[\?\!\.,;:]*$/i;

const please = /^(please|ple?(a|e)?(s|z))[\?\!\.,;:]*$/i;

const interview = /^interview[\?\!\.,;:]*$/i;

const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;



const frb = /^(erase|remove|turn|delete|eliminate|destroy|drop|wipe|withdraw|enable|disable|dismiss|add(ing)?|new|creat(e|ing)|insert(ing)?|submit(ing)?|includ(e|ing))[\?\!\.,;:]*$/i;

const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;



export type shoot    = { qid?: 'certain', Tags?: 'some', random?: true };

const random:shoot = { random: true };
const ofTag: shoot = { Tags: 'some' };
const ofQid: shoot = { qid: 'certain' };


let askMeChildren:     nodeLike[],
    tagOrDigit:        nodeLike[],
    tagOrDigitQuesion: nodeLike[];


export const askMeAQuestion_tree =
node(root, [
 
    node(next, askMeChildren = [
        node(question, tagOrDigit = [
            node(tag, [
                node(neg, []),
                node(frb, []),
            ], ofTag as shoot),
            node(digit, [
                node(neg, []),
                node(frb, []),
            ], ofQid as shoot),

            node(neg, []),
            node(frb, []),
        ], random as shoot),

        ...(tagOrDigitQuesion = [
        node(tag, [
            node(question, [
                node(neg, []),
                node(frb, []),
            ], ofTag as shoot),
            node(neg, []),
            node(frb, []),
        ]),

        node(digit, [
            node(question, [
                node(neg, []),
                node(frb, []),
            ], ofQid as shoot),
            node(neg, []),
            node(frb, []),
        ])
        ]),

        node(neg, []),
        node(frb, []),
    ]), // next -> ... (askMeChildren)

    node(ask, [
        node(me, [
            node(anything, tagOrDigit, random as shoot),
            ...askMeChildren
        ]),
        node(neg, []),
        node(frb, []),
    ]),

    node(ama, [
        node(neg, []),
        node(frb, []),
    ], random as shoot),

    node(a, [
        node(m, [
            node(a, [
                node(neg, []),
                node(frb, []),
            ], random as shoot),
            node(neg, []),
            node(frb, []),
        ]),

        node(question, tagOrDigit, random as shoot),

        ...tagOrDigitQuesion,

        node(neg, []),
        node(frb, []),
    ]),


    node(more, [
        node(questions, tagOrDigit, random as shoot),
        
        node(tag, [
            node(questions, [
                node(neg, []),
                node(frb, []),
            ], ofTag as shoot),
            node(neg, []),
            node(frb, []),
        ]),

        node(digit, [
            node(questions, [
                node(neg, []),
                node(frb, []),
            ], ofQid as shoot),
            node(neg, []),
            node(frb, []),
        ]),

        node(neg, []),
        node(frb, []),

    ]),


    node(another, [
        node(question, tagOrDigit, random as shoot),
        ...tagOrDigitQuesion,
        node(neg, []),
        node(frb, []),
    ]),

    node(interview, [
        node(me, tagOrDigit, random as shoot),
        node(neg, []),
        node(frb, []),
    ]),

    node(tag, [
        node(question, [
            node(please, [
                node(neg, []),
                node(frb, []),
            ], ofTag as shoot),
            node(neg, []),
            node(frb, []),
        ]),
        node(neg, []),
        node(frb, []),
    ]),

    node(digit, [
        node(question, [
            node(neg, []),
            node(frb, []),
        ], ofQid as shoot),
        node(neg, []),
        node(frb, []),
    ]),

    node(question, [
        node(please, tagOrDigit, random as shoot),
        node(tag, [
            node(please, [
                node(neg, []),
                node(frb, []),
            ], ofTag as shoot),
            node(neg, []),
            node(frb, []),
        ]),
        node(digit, [], ofQid as shoot),
        node(neg, []),
        node(frb, []),
    ]),

    node(frb, [])

]);
