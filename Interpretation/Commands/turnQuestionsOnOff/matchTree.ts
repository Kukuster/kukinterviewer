import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const rootRE = /[\s\S]+/g;
const turnRE = /^turn(ing|ed)?[\?\!\.,;:]*$/i
const endisableRE = /^(en|dis)abl(e|ing|ed)[\?\!\.,;:]*$/i;
const onoffRE = /^(on|off)[\?\!\.,;:]*$/i;
const questionRE = /^questions?(\S*)*/i;
const allRE = /^all[\?\!\.,;:]*$/i;
const digitRE = /(\d+)/g;


let digitshoot: nodeLike,
    lvl2: nodeLike[];

export const turnQuestionsOnOff_tree =
    node(rootRE, [
        node(turnRE, [

            node(onoffRE, lvl2 = [
                node(allRE, [
                    node(questionRE, [], 'shoot'),
                ]),
                node(questionRE, [
                    digitshoot = node(digitRE, [SELF], 'shoot')
                ]),
                node(digitRE, [
                    node(questionRE, [digitshoot], 'shoot'),
                    SELF
                ])
            ]),

            node(allRE, [
                node(questionRE, [
                    node(onoffRE, [], 'shoot'),
                ]),
            ]),

            node(questionRE, [
                node(onoffRE, [digitshoot]),
                node(digitRE, [
                    node(onoffRE, [], 'shoot'),
                    SELF
                ])
            ]),

            node(digitRE, [
                node(onoffRE, [
                    node(questionRE, [digitshoot], 'shoot'),
                    node(digitRE, [PARENTs_CHILDREN])
                ]),
                node(questionRE, [
                    node(onoffRE, [digitshoot], 'shoot'),
                    node(digitRE, [PARENTs_CHILDREN])
                ]),
                SELF
            ])

        ]),

        // "enable" and "disable" are treated as "turn on" and "turn off" respectively
        node(endisableRE, lvl2),

    ]);
