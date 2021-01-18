'use strict';

import { node } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE =  /[\s\S]+/g;




const enable  = /^(enabl(e|ing|ed)|activat(e|ing|ed)|start(ing|ed)?|begin(ning)?|began|launch(ing|ed)?|runn?(ing)?|ran|bring(ing)?|brought)[?!.,;:]*$/i;
const disable = /^(disabl(e|ing|ed)|deactivat(e|ing|ed)|finish(ing|ed)?|end(ing|ed)?|cancell?(ing|ed)?|stopp?(ing|ed)?|dismiss(ing|ed)?|fir(e|ed|ing)|retir(e|ed|ing)|discharg(e|ed|ing)|disband(ed|ing)?|free(d|ing)?|releas(e|ed|ing)|exempt(ed|ing)?|loos(e|ed|ing))[?!.,;:]*$/i;
const turn = /^(turn(ing|ed)?|switch(ing|ed)?|putt?(ed|ing)?|lay(ing)?|laid)[?!.,;:]*$/i;
const on  = /^(on|up)[?!.,;:]*$/i;
const off = /^(off|down|away)[?!.,;:]*$/i;

const resume = /^(resum(e|ed|ing)|continu(e|ed|ing)|keep(ing)?|kept)[?!.,;:]*$/i;

const neg = /^(not?|nah|without|do(es)?n'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t|never)[?!.,;:]*$/i;


const botasking = /^(bot|ask(ing|ed|er)?|interview(ing|ed|er)?|questionnaire)[?!.,;:]*$/i;



const frb = /^((hash)?tag(ged|ging)?|eras(e|ing)|remov(e|ing)|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?|each|every|all|\d+|list|show|display|(#([0-9_]*([a-zA-Z]+[0-9_]*)+))+|tag(s|ged|ging)?)[?!.,;:]*$/i;
const frb_askingTime = /((0?\d|1[012]).(0?\d|1\d|2\d|3[01]).(0?\d|1\d|2[01234])|(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?|(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?|tomorrow)|((\d{1,2})\s*(st|nd|rd|th))\s(day\s)?(of\s)?(january|february|march|april|may|june|july|august|september|october|november|december)|(morning|noon|afternoon|night|evening|midnight)|(second|minute|hour|day|week|month|year)|([ap]\.?m\.?))/i;


const question_s = /^questions?[?!.,;:]*$/i;


export type shoot = 'on' | 'off';

const onShoot:  shoot = 'on';
const offShoot: shoot = 'off';
const frbfrbneg = [
    node(neg, []),
    node(frb, []),
    node(frb_askingTime, []),
];


export const turnAskingOnOff_tree = 
    node(rootRE, [

        node(enable, [
            node(botasking, [
                ...frbfrbneg,
            ],  onShoot as shoot),
            ...frbfrbneg,
        ]),
        node(disable, [
            node(botasking, [
                ...frbfrbneg,
            ], offShoot as shoot),
            ...frbfrbneg,
        ]),

        node(turn, [
            node(on, [
                node(botasking, [
                    ...frbfrbneg,
                ],  onShoot as shoot),
                node(question_s, []),
                ...frbfrbneg,
            ],  onShoot as shoot),
            node(off,[
                node(botasking, [
                    ...frbfrbneg,
                ], offShoot as shoot),
                node(question_s, []),
                ...frbfrbneg,
            ], offShoot as shoot),
            node(botasking, [
                node(on, [
                    ...frbfrbneg,
                ], onShoot as shoot),
                node(off,[
                    ...frbfrbneg,
                ],offShoot as shoot),
                node(question_s, []),
                ...frbfrbneg,
            ]),
            node(question_s, []),
            ...frbfrbneg,
        ]),


        node(resume, [
            node(botasking, [
                ...frbfrbneg,
            ], onShoot as shoot),
            node(neg, [
                node(botasking, [
                    node(neg, []),
                ], offShoot as shoot),
                node(frb, []),
                node(frb_askingTime, []),
            ]),
            ...frbfrbneg,
        ], onShoot as shoot),
        


        node(neg, [

            node(botasking, [
                ...frbfrbneg,
            ], offShoot as shoot),

            node(resume, [
                node(botasking, [
                    ...frbfrbneg,
                ], offShoot as shoot),
                node(neg, [
                    node(botasking, [], onShoot as shoot),
                    node(frb, []),
                    node(frb_askingTime, []),
                ]),
            ], offShoot as shoot),

            node(frb, []),
            node(frb_askingTime, []),
        ]),


        node(frb, []),
        node(frb_askingTime, []),

    ]);





