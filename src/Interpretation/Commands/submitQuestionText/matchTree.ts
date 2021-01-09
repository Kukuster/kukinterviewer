'use strict';

import { node, PARENTs_CHILDREN, SELF } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE = /[\s\S]+/g;


// const deny = /^(deny|decline|abort|cancel)[?!.,;:]*$/i;
// const no = /^(n|no|nope|nah|nil|nicht)[?!.,;:]*$/i;
// const neg = /^(don't|never|not?)*[?!.,;:]*$/i;

const neg = /^(don'?t|never|n|no|nope|nah|nil|nicht|deny|decline|abort|cancel)[?!.,;:]*$/i;


const anyText = /^[\S]+$/g;

const add = /^(add(ing)?|new(ing)?|creat(e|ing)|insert(ing)?|submit(ing)?)[?!.,;:]*$/i;
const article_or_adjective = /^(a|de|the|thou|any|this|no|new|another|other)[?!.,;:]*$/i;
const question = /^questions?[?!.,;:]*$/i;

const to = /^(to|2)[?!.,;:]*$/i;



export type shoot = 'text provided' | 'denied';

export const textProvidedShoot: shoot = 'text provided';
export const denyShoot: shoot = 'denied';



export const submitQuestionText_tree =
    node(rootRE, [

        node(neg, [
            
            // don't -> ... 
            node(add, [
                node(neg, [PARENTs_CHILDREN], denyShoot as shoot),
                node(article_or_adjective, [
                    node(question, [], denyShoot as shoot),
                    node(anyText, [], textProvidedShoot as shoot),
                ], denyShoot as shoot),
                node(question, [], denyShoot as shoot),
                node(anyText, [], textProvidedShoot as shoot),
            ], denyShoot as shoot),

            // don't -> ...
            node(question, [
                node(neg, [
                    node(add, [
                        node(anyText, [], textProvidedShoot as shoot),
                    ], denyShoot as shoot),
                    SELF,
                    node(anyText, [], textProvidedShoot as shoot),
                ], denyShoot as shoot),
                node(to, [
                    node(add, [
                        node(anyText, [], textProvidedShoot as shoot),
                    ], denyShoot as shoot),
                    SELF,
                    node(anyText, [], textProvidedShoot as shoot),
                ], denyShoot as shoot),
                SELF,
                node(anyText, [], textProvidedShoot as shoot),
            ], denyShoot as shoot),

            // don't -> ...
            SELF,
            node(anyText, [], textProvidedShoot as shoot),
        ], denyShoot as shoot),

        // root -> 
        node(anyText, [], textProvidedShoot as shoot),

    ]);

