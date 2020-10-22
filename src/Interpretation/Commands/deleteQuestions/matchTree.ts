import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";
import { questionsQueryShoot } from "../../matchTree/extras/questionsQueryShoot.type";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const del = /^(delet(e|in(g|')?)?|eras(e|in(g|')?)?|remov(e|in(g|')?)?|eliminat(e|in(g|')?)?|drop(pin('|g)?)?|wip(e|in(g|')?)?)*[\?\!\.,;:]*$/i;
const question = /^questions?[\?\!\.,;:]*$/i;
const questions =/^questions[\?\!\.,;:]*$/i;
const questionDigit = /^questions?[\?\!\.,;:]*(#|№|N|n|@)(\d+)[\?\!\.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
const all = /^(all|each|every)[\?\!\.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging|s)?[\?\!\.,;:]*$/i;
const untagWord = /^un(hash)?tag(ged|ging)?[\?\!\.,;:]*$/i;

const turn = /^(turn(ing|ed)?|switch(ing|ed)?)[\?\!\.,;:]*$/i
const on  =  /^on[\?\!\.,;:]*$/i;
const off = /^off[\?\!\.,;:]*$/i;

const enable =  /^(enabl(e|ing|ed)|activat(e|ing|ed))[\?\!\.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed))[\?\!\.,;:]*$/i;

//const add = /^(add(ing|ed)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed))[\?\!\.,;:]*$/i;


const frb = /^(from|search|turn(in('|g)?)?|withdraw(in('|g)?)?|enabl(e|in('|g)?)|disabl(e|in('|g)?)|dismiss(in('|g)?)?|add(in('|g)?)?|new|creat(e|in('|g)?)|insert(in('|g)?)?|submit(in('|g)?)?|includ(e|in('|g)?)|ask(ed|in('|g)?)?)[\?\!\.,;:]*$/i;

const neg  = /^(not?|without|don'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t)[\?\!\.,;:]*$/i;
const dont = /^(don't|never)[\?\!\.,;:]*$/i;

const from = /^from[\?\!\.,;:]*$/i;


export type shoot = questionsQueryShoot;

const allShoot:         shoot = 'all';
const taggedWithShoot:  shoot = { Tags: 'some' };
const untaggedShoot:    shoot = { Tags: 'no' };
const taggedShoot:      shoot = { Tags: 'any' };
const enabledShoot:     shoot = { enabled: true };
const disabledShoot:    shoot = { enabled: false };
const qidsShoot:        shoot = { qids: 'some' };



let delQuestionsNot:     nodeLike[],
    delQuestions:        nodeLike[],
    delAllSmthQuestions: nodeLike[];


export const deleteQuestions_tree =
node(root, [

    node(del, [

        node(all, [
            
            // delete -> all -> ...
            node(question, delQuestions =  [

                // delete -> all -> questions -> ...
                node(tag, [
                    node(frb, [])
                ], taggedWithShoot as shoot),

                node(tagWord, [
                    node(tag, [
                        node(frb, [])
                    ], taggedWithShoot as shoot),
                    node(frb, [])    
                ], taggedShoot as shoot),

                node(untagWord, [
                    node(frb, [])
                ], untaggedShoot as shoot),


                // delete -> all -> questions -> ...
                node(neg, delQuestionsNot = [
                    node(tagWord, [
                        node(frb, [])
                    ], untaggedShoot as shoot),

                    node(untagWord, [
                        node(frb, [])
                    ], taggedShoot as shoot),

                    // delete -> all -> questions -> no[t] -> ...
                    node(turn, [
                        node(on, [
                            node(frb, [])
                        ], disabledShoot as shoot),
                        node(off, [
                            node(frb, [])
                        ], enabledShoot as shoot),

                        node(frb, [])
                    ]),

                    // delete -> all -> questions -> no[t] -> ...
                    node(enable, [
                        node(frb, [])
                    ], disabledShoot as shoot),

                    // delete -> all -> questions -> no[t] -> ...
                    node(disable, [
                        node(frb, [])
                    ], enabledShoot as shoot),

                    node(frb, []),
                ]),


                // delete -> all -> questions -> ...
                node(turn, [
                    node(on, [
                        node(frb, [])
                    ], enabledShoot as shoot),
                    node(off, [
                        node(frb, [])
                    ], disabledShoot as shoot),
                    node(frb, [])
                ]),

                // delete -> all -> questions -> ...
                node(enable, [
                    node(frb, [])
                ], enabledShoot as shoot),
                node(disable, [
                    node(frb, [])
                ], disabledShoot as shoot),

                node(from, [
                    node(tag, [
                        node(frb, [])
                    ], taggedWithShoot as shoot),

                    node(tagWord, [
                        node(tag, [
                            node(frb, [])
                        ], taggedWithShoot as shoot),
                        node(frb, [])
                    ], taggedShoot as shoot),

                    node(untagWord, [
                        node(frb, [])
                    ], untaggedShoot as shoot),

                    SELF,

                    node(frb, [])
                ]),

                node(frb, [])
            ], allShoot as shoot), // delete -> all -> questions

            ...( delAllSmthQuestions = [
            // delete -> all -> ...
            node(tag, [
                node(questions, [
                    node(digit, []),
                    node(frb, [])
                ], taggedWithShoot as shoot),
                node(frb, [])
            ]),

            // delete -> all -> ...
            node(tagWord, [
                node(tag, [
                    SELF,
                    node(questions, [
                        node(digit, []),
                        node(frb, []),
                    ], taggedWithShoot as shoot),
                    node(frb, [])
                ]),
                node(questions, [
                    node(digit, []),
                    node(frb, [])
                ], taggedShoot as shoot),
                node(frb, [])
            ]),

            // delete -> all -> ...
            node(untagWord, [
                node(questions, [
                    node(frb, [])
                ], untaggedShoot as shoot),
                node(frb, [])
            ]),

            // delete -> all -> ...
            node(turn, [
                node(on, [
                    node(questions, [
                        node(frb, [])
                    ], enabledShoot as shoot),
                    node(frb, [])
                ]),
                node(off, [
                    node(questions, [
                        node(frb, [])
                    ], disabledShoot as shoot),
                    node(frb, [])
                ]),
                node(tagWord, []),
                node(frb, [])
            ]),

            // delete -> all -> ...
            node(enable, [
                node(questions, [
                    node(frb, [])
                ], enabledShoot as shoot),
                node(tagWord, []),
                node(frb, [])
            ]),

            // delete -> all -> ...
            node(disable, [
                node(questions, [
                    node(frb, [])
                ], disabledShoot as shoot),
                node(tagWord, []),
                node(frb, [])
            ]),

            
            // delete -> all -> ...
            node(neg, [

                // delete -> all -> no[t] -> ...
                node(tagWord, [
                    node(questions, [
                        node(frb, [])
                    ], untaggedShoot as shoot),
                    node(frb, [])
                ]),

                node(untagWord, [
                    node(questions, [
                        node(frb, [])
                    ], taggedShoot as shoot),
                    node(frb, [])
                ]),

                // delete -> all -> no[t] -> ...
                node(turn, [
                    node(on, [
                        node(questions, [
                            node(frb, [])
                        ], disabledShoot as shoot),
                        node(frb, [])
                    ]),
                    node(off, [
                        node(questions, [
                            node(frb, [])
                        ], enabledShoot as shoot),
                        node(frb, [])
                    ]),

                    node(frb, [])
                ]),

                // delete -> all -> no[t] -> ...
                node(enable, [
                    node(questions, [
                        node(frb, [])
                    ], disabledShoot as shoot),
                    node(frb, [])
                ]),

                // delete -> all -> no[t] -> ...
                node(disable, [
                    node(questions, [
                        node(frb, [])
                    ], enabledShoot as shoot),
                    node(frb, [])
                ]),

                node(frb, [])
            ]), // delete -> all -> no[t]

            ]), // ...( delAllSmthQuestions = [...] )


            node(frb, [])
        ]), // delete -> all

        // delete -> ...
        node(question, [
            ...delQuestions,
            node(digit, [
                SELF,
                node(frb, [])
            ], qidsShoot as shoot),
        ]), // delete -> question

        // delete -> ...
        ...delAllSmthQuestions,

        // delete -> ...
        node(digit, [
            SELF,
            node(question, [
                node(frb, [])
            ], qidsShoot),
            node(frb, [])
        ]),     

        node(frb, [])
    ]), // delete


    node(dont, []),
    node(frb, [])

]);


