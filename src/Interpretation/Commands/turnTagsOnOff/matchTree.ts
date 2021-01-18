import { node, nodeLike, SELF } from "../../matchTree/node";


// any punctuation mark at the end: 
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const turn = /^(turn(ing|ed)?|switch(ing|ed)?)[?!.,;:]*$/i;
const enable  =  /^(enabl(e|ing|ed)|activat(e|ing|ed))[?!.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed))[?!.,;:]*$/i;
const on  =  /^on[?!.,;:]*$/i;
const off = /^off[?!.,;:]*$/i;


const all = /^(all|each|every)[?!.,;:]*$/i;
const any = /^(all|each|every|any)[?!.,;:]*$/i;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[?!.,;:]*/gi;

const tagWord = /^(hash)?tags?[?!.,;:]*$/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;


const mind = /^mind$/i;


// negation
const neg = /^(not?|without)[?!.,;:]*$/i;
const dont = /^(do(es)?n'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t|never)[?!.,;:]*$/i;


const frb                = /^((hash)?tag(ged|ging)|question(s|ed|ing)?|eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?)[?!.,;:]*$/i;
const frb_allowQuestions = /^((hash)?tag(ged|ging)|question(ed|ing)?|eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?)[?!.,;:]*$/i;


const questions = /^question(s)?[?!.,;:]*$/i;

const ask = /^(ask(ing|ed)?|interview(ed|ing)?)[?!.,;:]*$/i;


const make = /^(let|make|turn)[?!.,;:]*$/i;



export type shoot = { turn: 'on'|'off', Tags: 'all'|'some' };

const allOn  :shoot = { turn: 'on',  Tags: 'all' },
      allOff :shoot = { turn: 'off', Tags: 'all' },
     someOn  :shoot = { turn: 'on',  Tags: 'some' },
     someOff :shoot = { turn: 'off', Tags: 'some' };


let    root_children: nodeLike[],
    dontAsk_children: nodeLike[];


export const turnTagsOnOff_tree =
node(root, [



    ...(root_children = [
    node(turn, [

        // turn -> ...
        node(tag, [
            SELF,

            // turn -> # -> ...
            node(tagWord, [
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], someOn as shoot),
                node(off,[
                    node(on, []),
                    node(frb, []),
                ], someOff as shoot),
                node(frb, []),
            ]),

            // turn -> # -> ...
            node(questions, [
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], someOn as shoot),
                node(off, [
                    node(on, []),
                    node(frb, []),
                ], someOff as shoot),
                node(tagWord, []),
                node(frb, []),
            ]),

            // turn -> # -> ...
            node(on, [
                node(off, []),
                node(frb, []),
            ], someOn as shoot),
            node(off, [
                node(on, []),
                node(frb, []),
            ], someOff as shoot),

            // turn -> # -> ...
            node(frb, []),
        ]),

        // turn -> ...
        node(tagWord, [
            node(tag, [
                SELF,

                // turn -> tag -> # -> ...
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], someOn as shoot),
                node(off, [
                    node(on, []),
                    node(frb, []),
                ], someOff as shoot),
                node(frb, []),

                // turn -> tag -> # -> ...
                node(frb, []),
            ]),
        ]),

        // turn -> ...
        node(on, [
            node(tag, [
                SELF,
                node(off, []),
                node(frb_allowQuestions, []),
            ], someOn as shoot),
            node(all, [
                node(tagWord, [
                    SELF,
                    node(off, []),
                    node(frb, []),
                ], allOn as shoot),
                node(off, []),
                node(frb, []),
            ]),
            node(off, []),
            node(frb_allowQuestions, []),
        ]),
        node(off, [
            node(tag, [
                SELF,
                node(on, []),
                node(frb_allowQuestions, []),
            ], someOff as shoot),
            node(all, [
                node(tagWord, [
                    SELF,
                    node(on, []),
                    node(frb, []),
                ], allOff as shoot),
                node(on, []),
                node(frb, []),
            ]),
            node(on, []),
            node(frb_allowQuestions, []),
        ]),

        // turn -> ...
        node(all, [
            node(tagWord, [
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], allOn  as shoot),
                node(off, [
                    node(on, []),
                    node(frb, []),
                ], allOff as shoot),
                node(frb, []),
            ]),
            node(frb, []),
        ]),

        // turn -> ...
        node(frb_allowQuestions, []),
    ]),






    node(enable, [
        node(tag, [
            SELF,
            node(off, []),
            node(frb_allowQuestions, []),
        ], someOn as shoot),
        // enable -> ...
        node(all, [
            node(tagWord, [
                node(off, []),
                node(frb, []),
            ], allOn as shoot),
            node(off, []),
            node(frb, []),
        ]),
        node(off, []),
        node(frb_allowQuestions, []),
    ]),
    node(disable, [
        node(tag, [
            SELF,
            node(on,  []),
            node(frb_allowQuestions, []),
        ], someOff as shoot),
        // disable -> ...
        node(all, [
            node(tagWord, [
                node(on, []),
                node(frb, []),
            ], allOff as shoot),
            node(on, []),
            node(frb, []),
        ]),
        node(on, []),
        node(frb_allowQuestions, []),
    ]),





    node(tagWord, [
        // tag -> ...
        node(tag, [
            SELF,
            // tag -> # -> ...
            node(turn, [
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], someOn  as shoot),
                node(off,[
                    node(on,  []),
                    node(frb, []),
                ], someOff as shoot),
            ]),

            // tag -> # -> ...
            node(enable,  [
                node(off, []),
                node(frb, []),
            ], someOn  as shoot),
            node(disable, [
                node(on, []),
                node(frb, []),
            ], someOff as shoot),

            // tag -> # -> ...
            node(neg, []),
            node(dont, []),
            node(frb, []),
        ]),

        // tag -> ...
        node(all, [
            // tag -> all -> ...
            node(turn, [
                node(on, [
                    node(off, []),
                    node(frb, []),
                ], allOn  as shoot),
                node(off, [
                    node(on,  []),
                    node(frb, []),
                ], allOff as shoot),
            ]),

            // tag -> all -> ...
            node(enable, [
                node(frb, []),
            ], allOn  as shoot),
            node(disable, [
                node(frb, []),
            ], allOff as shoot),

            // tag -> all -> ...
            node(neg, []),
            node(dont, []),
            node(frb, []),
        ]),

        // tag -> ...
        node(neg, []),
        node(dont, []),
        node(frb, []),
    ]), // tag
    ]), // ...(root_children = […])  //






    node(neg, []),





    node(dont, [

        // don't -> ...
        node(mind, root_children),

        // don't -> ...
        node(ask, dontAsk_children = [
            node(tag, [
                SELF,
                node(on, []),
                node(frb_allowQuestions, []),
            ], someOff as shoot),

            // don't -> ask -> ...
            node(any, [
                node(tagWord, [
                    node(on, []),
                    node(frb, []),
                ], allOff as shoot),
                node(on, []),
                node(frb, []),
            ]),
            node(frb_allowQuestions, []),
        ]),

        // don't -> ...
        node(frb, []),
    ]),





    node(ask, [
        node(tag, [
            SELF,
            node(on, []),
            node(frb_allowQuestions, []),
        ], someOn as shoot),

        // ask -> ...
        node(any, [
            node(tagWord, [
                node(on, []),
                node(frb, []),
            ], allOn as shoot),
            node(on, []),
            node(frb, []),
        ]),

        node(neg, dontAsk_children),

        node(frb_allowQuestions, []),
    ]),





    node(make, [

        // make -> ...
        node(tag, [
            SELF,

            // make -> # -> ...
            node(tagWord, [
                node(enable, [
                    node(off, []),
                    node(disable, []),
                    node(frb, []),
                ], someOn as shoot),
                node(disable,[
                    node(on, []),
                    node(enable, []),
                    node(frb, []),
                ], someOff as shoot),
                node(frb, []),
            ]),

            // make -> # -> ...
            node(questions, [
                node(enable, [
                    node(off, []),
                    node(disable, []),
                    node(frb, []),
                ], someOn as shoot),
                node(disable, [
                    node(on, []),
                    node(enable, []),
                    node(frb, []),
                ], someOff as shoot),
                node(tagWord, []),
                node(frb, []),
            ]),

            // make -> # -> ...
            node(enable, [
                node(off, []),
                node(disable, []),
                node(frb, []),
            ], someOn as shoot),
            node(disable, [
                node(on, []),
                node(enable, []),
                node(frb, []),
            ], someOff as shoot),

            // make -> # -> ...
            node(frb_allowQuestions, []),
        ]),

        // make -> ...
        node(tagWord, [
            node(tag, [
                SELF,

                // make -> tag -> # -> ...
                node(enable, [
                    node(off, []),
                    node(disable, []),
                    node(frb, []),
                ], someOn as shoot),
                node(disable, [
                    node(on, []),
                    node(enable, []),
                    node(frb, []),
                ], someOff as shoot),
                node(frb, []),

                // make -> tag -> # -> ...
                node(frb, []),
            ]),
        ]),

        // make -> ...
        node(enable, [
            node(tag, [
                SELF,
                node(off, []),
                node(disable, []),
                node(frb_allowQuestions, []),
            ], someOn as shoot),
            node(all, [
                node(tagWord, [
                    SELF,
                    node(off, []),
                    node(disable, []),
                    node(frb, []),
                ], allOn as shoot),
                node(off, []),
                node(disable, []),
                node(frb, []),
            ]),
            node(off, []),
            node(disable, []),
            node(frb_allowQuestions, []),
        ]),
        node(disable, [
            node(tag, [
                SELF,
                node(on, []),
                node(enable, []),
                node(frb_allowQuestions, []),
            ], someOff as shoot),
            node(all, [
                node(tagWord, [
                    SELF,
                    node(on, []),
                    node(enable, []),
                    node(frb, []),
                ], allOff as shoot),
                node(on, []),
                node(enable, []),
                node(frb, []),
            ]),
            node(on, []),
            node(enable, []),
            node(frb_allowQuestions, []),
        ]),

        // make -> ...
        node(all, [
            node(tagWord, [
                node(enable, [
                    node(off, []),
                    node(disable, []),
                    node(frb, []),
                ], allOn  as shoot),
                node(disable, [
                    node(on, []),
                    node(enable, []),
                    node(frb, []),
                ], allOff as shoot),
                node(frb, []),
            ]),
            node(frb, []),
        ]),

        // make -> ...
        node(frb_allowQuestions, []),


    ]),




    node(frb, []),



]);
