import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;
const turn = /^(turn(ing|ed)?|switch(ing|ed)?)[?!.,;:]*$/i;
const enable  =  /^(enabl(e|ing|ed)|activat(e|ing|ed))[?!.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed))[?!.,;:]*$/i;
const on  =  /^on[?!.,;:]*$/i;
const off = /^off[?!.,;:]*$/i;


const question = /^questions?(\S*)*/i;
const all = /^(all|each|every)[?!.,;:]*$/i;
const digit = /(\d+)/g;

const frb = /^((hash)?tag(ged|ging)?|eras(e|ing)|remov(e|ing)|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?|list|show|display|(#([0-9_]*([a-zA-Z]+[0-9_]*)+))+|)[?!.,;:]*$/i;

let turnOnBranch: nodeLike[],
    turnOffBranch:nodeLike[] ;


export type shoot = { turn: 'on'|'off', questions: 'all'|'some' };

const allOn  :shoot = { turn: 'on',  questions: 'all' },
      allOff :shoot = { turn: 'off', questions: 'all' },
     someOn  :shoot = { turn: 'on',  questions: 'some' },
     someOff :shoot = { turn: 'off', questions: 'some' };


export const turnQuestionsOnOff_tree =
    node(root, [
        node(turn, [

            //turn
            node(on, turnOnBranch = [
                node(all, [
                    node(question, [], allOn as shoot),
                    node(frb, []),
                ]),
                node(question, [
                    node(digit, [SELF], someOn as shoot),
                    node(frb, []),
                ]),
                node(digit, [
                    node(question, [
                        node(digit, [SELF], someOn as shoot),
                        node(frb, []),
                    ], someOn as shoot),
                    SELF,
                    node(frb, []),
                ]),
            ]),

            //turn
            node(off, turnOffBranch = [
                node(all, [
                    node(question, [], allOff as shoot),
                    node(frb, []),
                ]),
                node(question, [
                    node(digit, [SELF], someOff as shoot),
                    node(frb, []),
                ]),
                node(digit, [
                    node(question, [
                        node(digit, [SELF], someOff as shoot),
                        node(frb, []),
                    ], someOff as shoot),
                    SELF,
                    node(frb, []),
                ]),
            ]),

            //turn
            node(all, [
                node(question, [
                    node(on,  [], allOn as shoot),
                    node(off, [], allOff as shoot),
                    node(frb, []),
                ]),
                node(frb, []),
            ]),

            //turn
            node(question, [
                node(on,  [
                    node(digit, [SELF], someOn as shoot),
                    node(frb, []),
                ]),
                node(off, [
                    node(digit, [SELF],someOff as shoot),
                    node(frb, []),
                ]),
                node(digit, [
                    node(on,  [], someOn as shoot),
                    node(off, [],someOff as shoot),
                    SELF,
                    node(frb, []),
                ]),
            ]),

            //turn
            node(digit, [
                node(on, [
                    node(question, [
                        node(digit, [SELF], someOn as shoot),
                        node(frb, []),
                    ], someOn as shoot),
                    node(digit, [PARENTs_CHILDREN]),
                    node(frb, []),
                ]),
                node(off, [
                    node(question, [
                        node(digit, [SELF],someOff as shoot),
                        node(frb, []),
                    ],someOff as shoot),
                    node(digit, [PARENTs_CHILDREN]),
                    node(frb, []),
                ]),
                node(question, [
                    node(on,  [
                        node(digit, [SELF], someOn as shoot),
                        node(frb, []),
                    ], someOn as shoot),
                    node(off,  [
                        node(digit, [SELF],someOff as shoot),
                        node(frb, []),
                    ],someOff as shoot),
                    node(digit, [PARENTs_CHILDREN]),
                    node(frb, []),
                ]),
                SELF,
                node(frb, []),
            ]),

            node(frb, []),

        ]),

        // "enable" and "disable" are treated as "turn on" and "turn off" respectively
        node(enable,  turnOnBranch),
        node(disable, turnOffBranch),

        node(frb, []),

    ]);
