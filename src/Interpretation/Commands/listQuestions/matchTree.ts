import { node, nodeLike, SELF } from "../../matchTree/node";
import { questionsQueryShoot } from "../../matchTree/extras/questionsQueryShoot.type";


// any punctuation mark at the end: 
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;
const list = /^((list|show|detail|reveal|pull|bring|search|find)(ing)?|(get|output)(t?ing)?|(displa(y|ing))|explos(e|ing))$/i;
const turn = /^(turn(ing|ed)?|switch(ing|ed)?)[?!.,;:]*$/i;
const enable  =  /^(enabl(e|ing|ed)|activat(e|ing|ed))[?!.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed))[?!.,;:]*$/i;
const on  =  /^on[?!.,;:]*$/i;
const off = /^off[?!.,;:]*$/i;



const question_s = /^questions?[?!.,;:]*$/i;
const question = /^question[?!.,;:]*$/i;
const questions = /^questions[?!.,;:]*$/i;
const questionDigit = /^questions?[?!.,;:]*(#|№|N|n|@)(\d+)[?!.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;
const all = /^(all|each|every)[?!.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging|s)?[?!.,;:]*$/i;
const taggedWord = /^(hash)?tagg?e?d[?!.,;:]*$/i;
const untagWord = /^un(hash)?tag(ged|ging)?[?!.,;:]*$/i;

//forbidden words
const frb = /^(eras(e|ing|ed)|remov(e|ing|ed)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing|ed)|add(ing)?|new|creat(e|ing)|insert(ing)?|submit(ing)?|includ(e|ing)?)[?!.,;:]*$/i;

// negation
const neg = /^(not?|without)[?!.,;:]*$/i;
const dont = /^(do(es)?n'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t|never)[?!.,;:]*$/i;

const add = /^(add(ing|ed)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed))[?!.,;:]*$/i;


let listQuestions_Children:             nodeLike[],
    listAll_someChildren:               nodeLike[],
    listAllQuestionsNot_children:       nodeLike[],
    listQuestionsNot_children:          nodeLike[],
    listEnabledQuestions_children:      nodeLike[],
    listDisabledQuestions_children:     nodeLike[],
    listNotEnabledQuestions_children:   nodeLike[],
    listNotDisabledQuestions_children:  nodeLike[];


export type shoot = questionsQueryShoot;

const allShoot:         shoot = 'all';
const taggedWithShoot:  shoot = { Tags: 'some' };
const untaggedShoot:    shoot = { Tags: 'no' };
const taggedShoot:      shoot = { Tags: 'any' };
const enabledShoot:     shoot = { enabled: true };
const disabledShoot:    shoot = { enabled: false };
const qidsShoot:        shoot = { qids: 'some' };

export const listQuestions_tree =
node(root, [

    node(list, [
        node(questions, listQuestions_Children = [
            
            // list -> questions -> ...
            node(tag, [
                SELF,
                node(frb, []),
            ], taggedWithShoot as shoot),
            node(tagWord, [
                node(tag, [
                    SELF,
                    node(frb, []),
                ], taggedWithShoot as shoot),
                node(neg, []),
                node(frb, [])
            ], taggedShoot as shoot),
            node(untagWord, [
                node(frb, []),
            ], untaggedShoot as shoot),


            // list -> questions -> ...
            node(turn, [
                node(on, [], enabledShoot as shoot),
                node(off, [], disabledShoot as shoot),
                node(frb, []),
            ]),
            node(enable, [
                node(frb, []),
            ], enabledShoot as shoot),
            node(disable, [
                node(frb, []),
            ], disabledShoot as shoot),


            // list -> questions -> ...
            node(neg, listQuestionsNot_children = [
                node(turn, [
                    node(on, [], disabledShoot as shoot),
                    node(off, [], enabledShoot as shoot),
                    node(frb, []),
                ]),
                node(enable, [
                    node(frb, []),
                ], disabledShoot as shoot),
                node(disable, [
                    node(frb, []),
                ], enabledShoot as shoot),
                node(tagWord, [
                    node(neg, []),
                    node(frb, [])
                ], untaggedShoot as shoot),
                node(untagWord, [
                    node(frb, []),
                ], taggedShoot as shoot),
                node(frb, []),
            ]),

            // list -> questions -> ...
            node(dont, listQuestionsNot_children),

            // list -> questions -> ...
            node(digit, [
                SELF,
                node(frb, []),
            ], qidsShoot as shoot),

        ], allShoot as shoot), // list -> questions

        // list -> ...
        node(question, listQuestions_Children),

        // list -> ...
        node(all, [

            node(question_s, [
                node(dont, listAllQuestionsNot_children = [
                    node(tagWord, [
                        node(digit, []),
                        node(frb, []),
                    ], untaggedShoot as shoot),
                    node(untagWord, [
                        node(digit, []),
                        node(frb, []),
                    ], taggedShoot as shoot),
                    node(enable, [
                        node(digit, []),
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(disable, [
                        node(digit, []),
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(turn, [
                        node(on, [
                            node(digit, []),
                            node(frb, []),
                        ], disabledShoot as shoot),
                        node(off, [
                            node(digit, []),
                            node(frb, []),
                        ], enabledShoot as shoot),
                        node(digit, []),
                        node(frb, []),
                    ]),
                    node(digit, []),
                    node(frb, []),
                ]),
                node(neg, listAllQuestionsNot_children),

                // list -> all -> questions -> ...
                node(untagWord, [
                    node(digit, []),
                    node(frb, []),
                ], untaggedShoot as shoot),
                node(tagWord, [
                    node(tag, [
                        SELF,
                        node(digit, []),
                        node(frb, []),
                    ], taggedWithShoot as shoot),
                    node(digit, []),
                    node(frb, []),
                ], taggedShoot as shoot),
                node(tag, [
                    SELF,
                    node(digit, []),
                    node(frb, []),
                ], taggedWithShoot as shoot),

                // list -> all -> questions -> ...
                node(enable, [
                    node(digit, []),
                    node(frb, []),
                ], enabledShoot as shoot),
                node(disable, [
                    node(digit, []),
                    node(frb, []),
                ], disabledShoot as shoot),
                node(turn, [
                    node(on, [
                        node(digit, []),
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(off, [
                        node(digit, []),
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(digit, []),
                    node(frb, []),
                ]),

                // list -> all -> questions -> ...
                node(digit, []),
                node(frb, []),
            ], allShoot as shoot),

            // list -> all -> ...
            ...(listAll_someChildren = [
            node(tag, [
                SELF,
                node(question_s, [], taggedWithShoot as shoot),
                node(digit, []),
                node(frb, []),
            ]),
            node(taggedWord, [
                node(tag, [
                    SELF,
                    node(question_s, [], taggedWithShoot as shoot),
                    node(digit, []),
                    node(frb, []),
                ]),
                node(question_s, [], taggedShoot as shoot),
                node(digit, []),
                node(frb, []),
            ]),
            node(tagWord, [
                node(tag, [
                    SELF,
                    node(question_s, [], taggedWithShoot as shoot),
                    node(digit, []),
                    node(frb, []),
                ]),
                node(digit, []),
                node(frb, []),
            ]),
            node(untagWord, [
                node(question_s, [], untaggedShoot as shoot),
                node(digit, []),
                node(frb, []),
            ]),

            // list -> all -> ...
            node(digit, [
                SELF,
                node(question_s, [], qidsShoot as shoot),
                node(frb, []),
            ], qidsShoot as shoot),

            // list -> all -> ...
            node(enable, listEnabledQuestions_children = [
                node(question_s, [
                    node(frb, []),
                ], enabledShoot as shoot),
                node(digit, []),
                node(tagWord, []),
                node(untagWord, []),
                node(tag, []),
                node(frb, []),
            ]),
            node(disable, listDisabledQuestions_children = [
                node(question_s, [
                    node(frb, []),
                ], disabledShoot as shoot),
                node(digit, []),
                node(tagWord, []),
                node(untagWord, []),
                node(tag, []),
                node(frb, []),
            ]),
            node(turn, [
                node(on, listEnabledQuestions_children),
                node(off, listDisabledQuestions_children),
                node(digit, []),
                node(tagWord, []),
                node(untagWord, []),
                node(tag, []),
                node(frb, []),
            ]),

            // list -> all -> ...
            node(neg, [
                node(enable, listNotEnabledQuestions_children = [
                    node(question_s, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(digit, []),
                    node(tagWord, []),
                    node(untagWord, []),
                    node(tag, []),
                    node(frb, []),
                ]),
                node(disable, listNotDisabledQuestions_children = [
                    node(question_s, [
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(digit, []),
                    node(tagWord, []),
                    node(untagWord, []),
                    node(tag, []),
                    node(frb, []),
                ]),
                node(turn, [
                    node(on, listNotEnabledQuestions_children),
                    node(off, listNotDisabledQuestions_children),
                    node(digit, []),
                    node(tagWord, []),
                    node(untagWord, []),
                    node(tag, []),
                    node(frb, []),
                ]),
                node(tagWord, [
                    node(question_s, [], untaggedShoot as shoot),
                    node(digit, []),
                    node(tagWord, []),
                    node(untagWord, []),
                    node(tag, []),
                    node(frb, []),
                ]),
                node(untagWord, [
                    node(question_s, [], taggedShoot as shoot),
                    node(digit, []),
                    node(tagWord, []),
                    node(untagWord, []),
                    node(tag, []),
                    node(frb, []),
                ]),
            ]), // list -> all -> neg
            ]), // ...(listAll_children = […])

            // list -> all -> ...
            node(digit, []),
            node(frb, []),

        ]), // list -> all

        // list -> ...
        ...listAll_someChildren,

        // list -> ...
        node(frb, []),


    ]), // list

    // ...
    node(add, []),
    node(neg, []),
    node(dont, []),
    node(frb, [])

]);
