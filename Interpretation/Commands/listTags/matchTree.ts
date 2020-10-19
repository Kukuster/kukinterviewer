import { tagsQueryShoot } from "../../matchTree/extras/tagsQueryShoot.type";
import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;
//const list = /^(list|show|get|output|detail|display|reveal|expose|pull|bring|search|find)|$/i;
const list = /^((list|show|detail|reveal|pull|bring|search|find)(ing)?|(get|output)(t?ing)?|(displa(y|ing))|explos(e|ing))$/i;
const turn = /^(turn(ing|ed)?|switch(ing|ed)?)[\?\!\.,;:]*$/i
const enable  =  /^(enabl(e|ing|ed)|activat(e|ing|ed))[\?\!\.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed))[\?\!\.,;:]*$/i;
const on  =  /^on[\?\!\.,;:]*$/i;
const off = /^off[\?\!\.,;:]*$/i;

const question = /^questions?[\?\!\.,;:]*$/i;
const questions = /^questions[\?\!\.,;:]*$/i;
const questionDigit = /^questions?[\?\!\.,;:]*(#|№|N|n|@)(\d+)[\?\!\.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
const all = /^(all|each|every)[\?\!\.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging|s)?[\?\!\.,;:]*$/i;
const tagsWord = /^(hash)?tags[\?\!\.,;:]*$/i;
const taggedWord = /^(hash)?tagg?e?d[\?\!\.,;:]*$/i;
const untagWord = /^un(hash)?tag(ged|ging)?[\?\!\.,;:]*$/i;

//forbidden words
const frb = /^(question(s|ed|ing)?|eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?)[\?\!\.,;:]*$/i;

// negation
//const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;
const neg = /^(not?|without)[\?\!\.,;:]*$/i;
const dont = /^(do(es)?n'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t|never)[\?\!\.,;:]*$/i;

const add = /^(add(ed)?|new|creat(e|ed)|insert(ed)?|submit(ed)?|includ(e|ed))[\?\!\.,;:]*$/i;


export type shoot = tagsQueryShoot;

const allShoot:         shoot = 'all';
const enabledShoot:     shoot = { enabled: true };
const disabledShoot:    shoot = { enabled: false };
const qidsShoot:        shoot = { qids: 'some' };


let listTags_children: nodeLike[],
    listSmthTags_children: nodeLike[];


export const listTags_tree =
node(root, [

    node(list, [
        node(all, [
            
            ...(listSmthTags_children = [
            // list -> all -> ...
            node(turn, [
                node(on, [
                    node(tagWord, [
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(frb, []),
                ]),
                node(off,[
                    node(tagWord, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(frb, []),
                ]),
            ]),
            node(enable, [
                node(tagWord, [
                    node(frb, []),
                ], enabledShoot as shoot),
                node(frb, []),
            ]),
            node(disable, [
                node(tagWord, [
                    node(frb, []),
                ], disabledShoot as shoot),
                node(frb, []),
            ]),

            // list -> all -> ...
            node(neg, [

                // list -> all -> not -> ...
                node(turn, [
                    node(on, [
                        node(tagWord, [
                            node(frb, []),
                        ], disabledShoot as shoot),
                        node(frb, []),
                    ]),
                    node(off, [
                        node(tagWord, [
                            node(frb, []),
                        ], enabledShoot as shoot),
                        node(frb, []),
                    ]),
                ]),
                node(enable, [
                    node(tagWord, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(frb, []),
                ]),
                node(disable, [
                    node(tagWord, [
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(frb, []),
                ]),

            ]),
            ]), // ...(listSmthTags_children = […])

            // list -> all -> ...
            node(tagWord, listTags_children = [
                
                // list -> all -> tag -> ...
                node(turn, [
                    node(on, [
                        node(frb, []),
                    ], enabledShoot as shoot),
                    node(off, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                ]),
                node(enable, [
                    node(frb, []),
                ], enabledShoot as shoot),
                node(disable, [
                    node(frb, []),
                ], disabledShoot as shoot),

                // list -> all -> tag -> ...
                node(neg, [

                    // list -> all -> tag -> not -> ...
                    node(turn, [
                        node(on, [
                            node(frb, []),
                        ], disabledShoot as shoot),
                        node(off, [
                            node(frb, []),
                        ], enabledShoot as shoot),
                    ]),
                    node(enable, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(disable, [
                        node(frb, []),
                    ], enabledShoot as shoot),

                ]),

                // list -> all -> tag -> ...
                node(dont, [
                    
                    // list -> all -> tag -> not -> ...
                    node(turn, [
                        node(on, [
                            node(frb, []),
                        ], disabledShoot as shoot),
                        node(off, [
                            node(frb, []),
                        ], enabledShoot as shoot),
                    ]),
                    node(enable, [
                        node(frb, []),
                    ], disabledShoot as shoot),
                    node(disable, [
                        node(frb, []),
                    ], enabledShoot as shoot),

                ]),

                // list -> all -> tag -> ...
                node(frb, []),
            ], allShoot as shoot),

            // list -> all -> ...
            node(add, [PARENTs_CHILDREN]),

            // list -> all -> ...
            node(frb, []),
        ]), // list -> all

        // list -> ...
        node(tagsWord, listTags_children, allShoot as shoot),

        // list -> ...
        node(tagWord, listTags_children),

        // list -> ...
        ...listSmthTags_children,
        
        // list -> ...
        node(frb, []),
    ]),

    node(neg, []),
    node(dont, []),
    node(frb, []),

]);
