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
                ]),
                node(question, [
                    node(digit, [SELF], someOn as shoot)
                ]),
                node(digit, [
                    node(question, [
                        node(digit, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    SELF
                ])
            ]),

            //turn
            node(off, turnOffBranch = [
                node(all, [
                    node(question, [], allOff as shoot),
                ]),
                node(question, [
                    node(digit, [SELF], someOff as shoot)
                ]),
                node(digit, [
                    node(question, [
                        node(digit, [SELF], someOff as shoot)
                    ], someOff as shoot),
                    SELF
                ])
            ]),

            //turn
            node(all, [
                node(question, [
                    node(on,  [], allOn as shoot),
                    node(off, [], allOff as shoot),
                ]),
            ]),

            //turn
            node(question, [
                node(on,  [
                    node(digit, [SELF], someOn as shoot)
                ]),
                node(off, [
                    node(digit, [SELF],someOff as shoot)
                ]),
                node(digit, [
                    node(on,  [], someOn as shoot),
                    node(off, [],someOff as shoot),
                    SELF
                ])
            ]),

            //turn
            node(digit, [
                node(on, [
                    node(question, [
                        node(digit, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    node(digit, [PARENTs_CHILDREN])
                ]),
                node(off, [
                    node(question, [
                        node(digit, [SELF],someOff as shoot)
                    ],someOff as shoot),
                    node(digit, [PARENTs_CHILDREN])
                ]),
                node(question, [
                    node(on,  [
                        node(digit, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    node(off,  [
                        node(digit, [SELF],someOff as shoot)
                    ],someOff as shoot),
                    node(digit, [PARENTs_CHILDREN])
                ]),
                SELF
            ])

        ]),

        // "enable" and "disable" are treated as "turn on" and "turn off" respectively
        node(enable,  turnOnBranch),
        node(disable, turnOffBranch),

    ]);
