import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const rootRE = /[\s\S]+/g;
const turnRE = /^turn(ing|ed)?[\?\!\.,;:]*$/i
const enableRE  =  /^enabl(e|ing|ed)[\?\!\.,;:]*$/i;
const disableRE = /^disabl(e|ing|ed)[\?\!\.,;:]*$/i;
const onRE  =  /^on[\?\!\.,;:]*$/i;
const offRE = /^off[\?\!\.,;:]*$/i;
const questionRE = /^questions?(\S*)*/i;
const allRE = /^(all|each|every)[\?\!\.,;:]*$/i;
const digitRE = /(\d+)/g;


let OnDigitRecursiveShoot: nodeLike,
   OffDigitRecursiveShoot: nodeLike,
    turnOnBranch: nodeLike[],
    turnOffBranch:nodeLike[] ;


export type shoot = { turn: 'on'|'off', questions: 'all'|'some' };

const allOn  :shoot = { turn: 'on',  questions: 'all' },
      allOff :shoot = { turn: 'off', questions: 'all' },
     someOn  :shoot = { turn: 'on',  questions: 'some' },
     someOff :shoot = { turn: 'off', questions: 'some' }


export const turnQuestionsOnOff_tree =
    node(rootRE, [
        node(turnRE, [

            //turn
            node(onRE, turnOnBranch = [
                node(allRE, [
                    node(questionRE, [], allOn as shoot),
                ]),
                node(questionRE, [
                    node(digitRE, [SELF], someOn as shoot)
                ]),
                node(digitRE, [
                    node(questionRE, [
                        node(digitRE, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    SELF
                ])
            ]),

            //turn
            node(offRE, turnOffBranch = [
                node(allRE, [
                    node(questionRE, [], allOff as shoot),
                ]),
                node(questionRE, [
                    node(digitRE, [SELF], someOff as shoot)
                ]),
                node(digitRE, [
                    node(questionRE, [
                        node(digitRE, [SELF], someOff as shoot)
                    ], someOff as shoot),
                    SELF
                ])
            ]),

            //turn
            node(allRE, [
                node(questionRE, [
                    node(onRE,  [], allOn as shoot),
                    node(offRE, [], allOff as shoot),
                ]),
            ]),

            //turn
            node(questionRE, [
                node(onRE,  [
                    node(digitRE, [SELF], someOn as shoot)
                ]),
                node(offRE, [
                    node(digitRE, [SELF],someOff as shoot)
                ]),
                node(digitRE, [
                    node(onRE,  [], someOn as shoot),
                    node(offRE, [],someOff as shoot),
                    SELF
                ])
            ]),

            //turn
            node(digitRE, [
                node(onRE, [
                    node(questionRE, [
                        node(digitRE, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    node(digitRE, [PARENTs_CHILDREN])
                ]),
                node(offRE, [
                    node(questionRE, [
                        node(digitRE, [SELF],someOff as shoot)
                    ],someOff as shoot),
                    node(digitRE, [PARENTs_CHILDREN])
                ]),
                node(questionRE, [
                    node(onRE,  [
                        node(digitRE, [SELF], someOn as shoot)
                    ], someOn as shoot),
                    node(offRE,  [
                        node(digitRE, [SELF],someOff as shoot)
                    ],someOff as shoot),
                    node(digitRE, [PARENTs_CHILDREN])
                ]),
                SELF
            ])

        ]),

        // "enable" and "disable" are treated as "turn on" and "turn off" respectively
        node(enableRE,  turnOnBranch),
        node(disableRE, turnOffBranch),

    ]);
