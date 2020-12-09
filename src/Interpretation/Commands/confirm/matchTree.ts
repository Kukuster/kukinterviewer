'use strict';

import { node } from "../../matchTree/node";


// any punctuation mark at the end:
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE =  /[\s\S]+/g;


const confirm = /^(confirm|proceed)[\?\!\.,;:]*$/i;
const deny    = /^(deny)[\?\!\.,;:]*$/i;

const yes = /^y((e|u|a|o|ee|oo)(s|p)?)?[\?\!\.,;:]*$/i;
const no =  /^(n|no|nope|nah|nil|nicht|abort|cancel)[\?\!\.,;:]*$/i;


export type shoot = 'confirm' | 'deny';

const confirmShoot: shoot = 'confirm';
const denyShoot:    shoot = 'deny';


export const confirm_tree = 
    node(rootRE, [
        
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

    ]);

