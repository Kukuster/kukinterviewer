'use strict';

import { node, nodeLike, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE =  /[\s\S]+/g;


const confirm = /^(confirm|proceed|sure|ofcourse|ofc|((you|u|yuo|yu|yo|ya)bet))[?!.,;:]*$/i;
const deny    = /^(deny)[?!.,;:]*$/i;

const yes = /^y((e|u|a|o|ee|oo)(s|p)?)?[?!.,;:]*$/i;
const no =  /^(n|no|nope|nah|nil|nicht|abort|cancel|don'?t|won'?t)[?!.,;:]*$/i;

const of = /^of[?!.,;:]*$/i;
const course = /^course[?!.,;:]*$/i;

const you = /^(you|u|yuo|yu|yo|ya)[?!.,;:]*$/i;
const bet = /^bet[?!.,;:]*$/i;


export type shoot = 'confirm' | 'deny';

const confirmShoot: shoot = 'confirm';
const denyShoot:    shoot = 'deny';


let yes_no_confirm_deny: nodeLike[];


export const confirm_tree = 
    node(rootRE, [

        ...(yes_no_confirm_deny = [
        node(yes, [
            node(no, []),
            node(deny, []),
        ], confirmShoot),

        node(no, [
            node(yes, []),
            node(confirm, [])
        ], denyShoot),

        node(confirm, [
            node(no, []),
            node(deny, []),
        ], confirmShoot),

        node(deny, [
            node(yes, []),
            node(confirm, [])
        ], denyShoot),
        ]), //yes_no_confirm_deny


        node(you, [
            PARENTs_CHILDREN,
            node(bet, yes_no_confirm_deny, confirmShoot),
        ]),

        node(of, [
            PARENTs_CHILDREN,
            node(course, yes_no_confirm_deny, confirmShoot),
        ]),




    ]);

