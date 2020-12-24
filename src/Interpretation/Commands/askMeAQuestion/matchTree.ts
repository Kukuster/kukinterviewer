import { node, nodeLike } from "../../matchTree/node";


// any punctuation mark at the end: 
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const next = /^next[?!.,;:]*$/i;
const question  = /^question[?!.,;:]*$/i;
const questions = /^questions?[?!.,;:]*$/i;
const ask = /^(ask|give)[?!.,;:]*$/i;
const me = /^me[?!.,;:]*$/i;
const anything = /^(anythin(g|')?|somethin(g|')?)[?!.,;:]*$/i;

const a = /^a[?!.,;:]*$/i;
const m = /^m[?!.,;:]*$/i;

const ama = /^[?!.,;:]*a[?!.,;:]*m[?!.,;:]*a[?!.,;:]*$/i;

const another = /^(a?nother?|any)[?!.,;:]*$/i;

const more = /^(more|moar)[?!.,;:]*$/i;

const please = /^(please|ple?(a|e)?(s|z))[?!.,;:]*$/i;

const interview = /^interview[?!.,;:]*$/i;

const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;



const frb = /^(erase|remove|turn|delete|eliminate|destroy|drop|wipe|withdraw|enable|disable|dismiss|add(ing)?|new|creat(e|ing)|insert(ing)?|submit(ing)?|includ(e|ing)|regular(ly)|every|at|@)[?!.,;:]*$/i;
const frb_askingTime = /^((0?\d|1[012]).(0?\d|1\d|2\d|3[01]).(0?\d|1\d|2[01234])|(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?|(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?|tomorrow)|((\d{1,2})\s*(st|nd|rd|th))\s(day\s)?(of\s)?(january|february|march|april|may|june|july|august|september|october|november|december)|(morning|noon|afternoon|night|evening|midnight)|(second|minute|hour|day|week|month|year)|([ap]\.?m\.?))[?!.,;:]*$/i;
const list = /^((list|show|detail|reveal|pull|bring|search|find)(ing)?|(get|output)(t?ing)?|(displa(y|ing))|explos(e|ing))$/i;

const tagWord = /^(hash)?tag(ged|ging)?[?!.,;:]*$/i;

const neg = /^(don't|never|not?)*[?!.,;:]*$/i;



export type shoot    = { qid?: 'certain', Tags?: 'some', random?: true };

const random:shoot = { random: true };
const ofTag: shoot = { Tags: 'some' };
const ofQid: shoot = { qid: 'certain' };


let askMeChildren:     nodeLike[],
    tagOrDigit:        nodeLike[],
    tagOrDigitQuesion: nodeLike[];


const frb_frb_neg: nodeLike[] = [
    node(neg, []),
    node(frb_askingTime, []),
    node(frb, []),
];


export const askMeAQuestion_tree =
node(root, [
 
    node(next, askMeChildren = [
        node(question, tagOrDigit = [
            node(tag, [
                ...frb_frb_neg,
            ], ofTag as shoot),
            node(digit, [
                ...frb_frb_neg,
            ], ofQid as shoot),

            ...frb_frb_neg,
        ], random as shoot),

        ...(tagOrDigitQuesion = [
        node(tag, [
            node(question, [
                ...frb_frb_neg,
            ], ofTag as shoot),
            ...frb_frb_neg,
        ]),

        node(digit, [
            node(question, [
                ...frb_frb_neg,
            ], ofQid as shoot),
            ...frb_frb_neg,
        ])
        ]),

        ...frb_frb_neg,
    ]), // next -> ... (askMeChildren)

    node(ask, [
        node(me, [
            node(anything, tagOrDigit, random as shoot),
            ...askMeChildren
        ]),
        ...frb_frb_neg,
    ]),

    node(ama, [
        ...frb_frb_neg,
    ], random as shoot),

    node(a, [
        node(m, [
            node(a, [
                ...frb_frb_neg,
            ], random as shoot),
            ...frb_frb_neg,
        ]),

        node(question, tagOrDigit, random as shoot),

        ...tagOrDigitQuesion,

        ...frb_frb_neg,
    ]),


    node(more, [
        node(questions, tagOrDigit, random as shoot),
        
        node(tag, [
            node(questions, [
                ...frb_frb_neg,
            ], ofTag as shoot),
            ...frb_frb_neg,
        ]),

        node(digit, [
            node(questions, [
                ...frb_frb_neg,
            ], ofQid as shoot),
            ...frb_frb_neg,
        ]),

        ...frb_frb_neg,

    ]),


    node(another, [
        node(question, tagOrDigit, random as shoot),
        ...tagOrDigitQuesion,
        ...frb_frb_neg,
    ]),

    node(interview, [
        node(me, tagOrDigit, random as shoot),
        ...frb_frb_neg,
    ]),

    node(tag, [
        node(question, [
            node(please, [
                ...frb_frb_neg,
            ], ofTag as shoot),
            ...frb_frb_neg,
        ]),
        ...frb_frb_neg,
    ]),

    node(digit, [
        node(question, [
            ...frb_frb_neg,
        ], ofQid as shoot),
        ...frb_frb_neg,
    ]),

    node(question, [
        node(please, tagOrDigit, random as shoot),
        node(tag, [
            node(please, [
                ...frb_frb_neg,
            ], ofTag as shoot),
            ...frb_frb_neg,
        ]),
        node(digit, [], ofQid as shoot),
        ...frb_frb_neg,
    ]),

    node(tagWord, []),
    node(list, []),
    ...frb_frb_neg,

]);
