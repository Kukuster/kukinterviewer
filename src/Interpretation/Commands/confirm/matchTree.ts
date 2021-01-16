'use strict';

import { node, nodeLike, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE =  /[\s\S]+/g;


const confirm = /^(confirm|proceed|sure|ofcourse|ofc|((you|u|yuo|yu|yo|ya)bet))[?!.,;:]*$/i;
const deny    = /^(deny)[?!.,;:]*$/i;

// const yes=/^y((e|u|a|o|ee|oo)(s|p)?)?[?!.,;:]*$/i;
const yes = /^y((e|u|a|o|ee|oo)?(s|p))?[?!.,;:]*$/i;
const no =  /^(n|no|nope|nah|nil|nicht|nein|net|abort|cancel|don'?t|won'?t|doesn'?t)[?!.,;:]*$/i;
const nnooononon = /^(no*)+[?!.,;:]*$/i;

const of = /^of[?!.,;:]*$/i;
const course = /^course[?!.,;:]*$/i;

const you = /^(u|you|yuo)[?!.,;:]*$/i;
const bet = /^bet[?!.,;:]*$/i;

// can be interpreted as either "you" or "yes"
const ya  = /^y(e|u|a|o|ee|oo)[?!.,;:]*$/i;

const thats = /^that'?s[?!.,;:]*$/i;
const that  = /^that[?!.,;:]*$/i;
const is    = /^'?(is|eez|ees|s)[?!.,;:]*$/i;
const isnt  = /^'?(is|eez|ees|s)n'?t[?!.,;:]*$/i;
const right = /^(right|rite|r8|->|reit|👉|▶️)[?!.,;:]*$/i;


const why = /^why[?!.,;:]*$/i;
const ask = /^ask(ing?)?[?!.,;:]*$/i;
const not = /^(n|no|not|nope|nah|nil|nicht|don'?t|won'?t|doesn'?t)[?!.,;:]*$/i;

const emojiConfirm = /^(👌|👍|🆗|😉|🆗)/i;

const emojiDeny = /^(🙅‍♀️|🙅|🙅‍♂️|🤦‍♀️|🤦|🤦‍♂️|❌|🚫)/i;

const ok = /^(ok|k|okay|okey|key)[?!.,;:]*$/i;



export type shoot = 'confirm' | 'deny';

const confirmShoot: shoot = 'confirm';
const denyShoot:    shoot = 'deny';


let yes_no_confirm_deny: nodeLike[],
    yes_children:        nodeLike[],
    you_children:        nodeLike[];


export const confirm_tree = 
    node(rootRE, [

        ...(yes_no_confirm_deny = [
        node(yes, yes_children = [
            node(no, []),
            node(deny, []),
        ], confirmShoot as shoot),

        node(no, [
            node(not, [
                node(ok, [], denyShoot as shoot),
            ], denyShoot as shoot),

            node(isnt, [
                node(ok, [], denyShoot as shoot),
            ], denyShoot as shoot),            

            node(yes, []),
            node(confirm, [])
        ], denyShoot as shoot),

        node(nnooononon, [
            node(yes, []),
            node(confirm, [])
        ], denyShoot as shoot),

        node(confirm, [
            node(no, []),
            node(deny, []),
        ], confirmShoot as shoot),

        node(deny, [
            node(yes, []),
            node(confirm, [])
        ], denyShoot as shoot),
        ]), //yes_no_confirm_deny


        node(you, you_children = [
            PARENTs_CHILDREN,
            node(bet, yes_no_confirm_deny, confirmShoot as shoot),
            node(ask, [], confirmShoot as shoot),
        ]),

        node(of, [
            PARENTs_CHILDREN,
            node(course, yes_no_confirm_deny, confirmShoot as shoot),
        ]),

        
        node(ya, [
            ...yes_children,
            ...you_children
        ], confirmShoot),

        node(thats, [
            PARENTs_CHILDREN,
            node(right, [], confirmShoot as shoot),
        ]),

        node(that, [
            PARENTs_CHILDREN,
            node(is, [
                node(right, [], confirmShoot as shoot),
            ]),
        ]),

        node(why, [
            node(not, [], confirmShoot as shoot),
            node(ask, [], confirmShoot as shoot),
        ]),

        node(emojiConfirm, [], confirmShoot as shoot),

        node(emojiDeny, [], denyShoot as shoot),

        node(ok, [PARENTs_CHILDREN], confirmShoot as shoot),

        node(not, [
            node(ok, [], denyShoot as shoot),
        ], denyShoot as shoot),

        node(isnt, [
            node(ok, [], denyShoot as shoot),
        ], denyShoot as shoot),

    ]);

