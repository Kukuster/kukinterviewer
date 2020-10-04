import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const del = /^(delet(e|in(g|')?)?|eras(e|in(g|')?)?|remov(e|in(g|')?)?|eliminat(e|in(g|')?)?|drop(pin('|g)?)?|wip(e|in(g|')?)?)*[\?\!\.,;:]*$/i;
const question = /^questions?(\S*)*/i;
const questionDigit = /^questions?[\?\!\.,;:]*(#|№|N|n|@)(\d+)[\?\!\.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
const all = /^(all|each|every)[\?\!\.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging|s)?[\?\!\.,;:]*$/i;
const untagWord = /^(un(hash)?tag(ged|ging)?|unset(ted|ting)?)[\?\!\.,;:]*$/i;
const set = /^(set(ting)?|mak(e|ing)|let(ting)?|got|made)[\?\!\.,;:]*$/i;


const frb = /^(search|turn(in('|g)?)?|add(ing|ed)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)|withdraw(ing)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)?)[\?\!\.,;:]*$/i;

const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;



export type shoot   = { Tags: 'all'|'some', questions: 'all'|'some' };

const qSome_tSome: shoot = { Tags: 'some', questions: 'some' };
const qSome_tAll:  shoot = { Tags: 'all',  questions: 'some' };
const qAll_tSome:  shoot = { Tags: 'some', questions: 'all' };
const qAll_tAll:   shoot = { Tags: 'all',  questions: 'all' };


export const removeTagsFromQuestions_tree =
node(root, [

    node(del, [
        node(all, [
            node(tagWord, [
                // del -> all -> tag ...
                node(digit, [
                    SELF,
                    node(question, [
                        node(neg, []),
                        node(frb, []),
                    ], qSome_tAll as shoot),
                    node(neg, []),
                    node(frb, []),
                ]),
                // del -> all -> tag ...
                node(question, [
                    node(digit, [
                        SELF,
                        node(neg, []),
                        node(frb, []),
                    ], qSome_tAll as shoot),
                    node(neg, []),
                    node(frb, []),
                ]),
                // del -> all -> tag ...
                node(all, [
                    node(question, [
                        node(digit, []),
                        node(neg, []),
                        node(frb, []),
                    ], qAll_tAll as shoot), 
                    node(neg, []),
                    node(frb, []),
                ]),
                // del -> all -> tag ...
                node(neg, []),
                node(frb, []),
            ]),
            node(neg, []),
            node(frb, []),
        ]),

        // del -> ...
        node(tag, [
            SELF,
            node(question, [
                node(digit, [SELF], qSome_tSome as shoot),
            ]),

            node(all, [
                node(question, [], qAll_tSome as shoot),
            ]),

            // del -> # -> ...
            node(neg, []),
            node(frb, []),
        ]),

        // del -> ...
        node(question, [
            node(digit, [
                SELF,
                node(all, [
                    node(tagWord, [], qSome_tAll as shoot),
                ]),
                node(tag, [SELF], qSome_tSome as shoot),
            ]),

            // del -> question -> ...
            node(neg, []),
            node(frb, []),
        ]),

        // del -> ...
        node(neg, []),
        node(frb, []),

    ]), // del


    node(untagWord, [
        node(all, [
            node(question, [
                node(tag, [
                    SELF,
                    node(digit, []),
                    node(neg, []),
                    node(frb, []),
                ], qAll_tSome as shoot),
                node(digit, []),    
                node(neg, []),
                node(frb, []),
            ], qAll_tAll as shoot),
            node(neg, []),
            node(frb, []),            
        ]),

        // untagWord -> ...
        node(question, [
            node(digit, [
                node(tag, [SELF], qSome_tSome as shoot),
                SELF
            ], qSome_tAll as shoot),

            // untagWord -> question -> ...
            node(neg, []),
            node(frb, []),
        ]),

        // untagWord -> ...
        node(tag, [
            SELF,
            node(all, [
                node(question, [
                    node(neg, []),
                    node(frb, []),
                ], qAll_tSome as shoot)
            ]),
            // untagWord -> # -> ...
            node(question, [
                node(digit, [
                    SELF,
                    node(neg, []),
                    node(frb, []),
                ], qSome_tSome as shoot),
            ]),
            // untagWord -> # -> ...
            node(neg, []),
            node(frb, []),
        ]),

        // untagWord -> ...
        node(digit, [
            node(question, [
                node(tag, [
                    SELF,
                    node(neg, []),
                    node(frb, []),
                ], qSome_tAll as shoot)
            ], qAll_tAll),
            SELF,

            // untagWord -> digit -> ...
            node(neg, []),
            node(frb, []),
        ]),


        // untagWord -> ...
        node(neg, []),
        node(frb, []),

    ]), // untagWord


    node(set, [
        node(question, [
            node(digit, [
                SELF,
                node(untagWord, [
                    node(tag, [
                        SELF,
                        node(neg, []),
                        node(frb, []),
                    ], qSome_tSome as shoot),
                    node(neg, []),
                    node(frb, []),
                ], qSome_tAll),
                node(neg, []),
                node(frb, []),
            ]),
            node(neg, []),
            node(frb, []),
        ]),
        // set -> ...
        node(neg, []),
        node(frb, []),
    ]), // set


    node(neg, []),
    node(frb, []),    


]);
