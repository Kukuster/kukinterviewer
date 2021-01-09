'use strict';

import { node, nodeC, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+

const rootRE =  /[\s\S]+/g;


const hello = /^(hello|hi|hey|hiya|ahoy|'ello|low|hey)[?!.,;:]*$/i;

const greet = /^(greetings|morning?|afternoon|evening?|g'day|g'morning?|g'afternoon|goodmorrow|howdy|holler|sup|wh?a(s|z)+u+p|yo|alrighty?)[?!.,;:]*$/i;

const hello_foreign = /^(bonjour|hola|salaam|privet|aloha)[?!.,;:]*$/i;

const guten = /^guten$/i;
const tag = /^tag$[?!.,;:]*$/i;


const good = /^(good|great|nice|pleasure|lovely|cool|peachy|amazing|cool|pleased)[?!.,;:]*$/i;
const timeOfDay = /^(morning?|evening?|afternoon)[?!.,;:]*$/i;

const its = /^it's[?!.,;:]*$/i;
const its_good_to = /^(to|ot|2|two)[?!.,;:]*$/i;
const its_good_to_meet = /^(meet|see|c)[?!.,;:]*$/i;
const its_good_to_meet_you = /^(you|ya|ye|u)[?!.,;:]*$/i;


const how = /^(how|huw|hou)[?!.,;:]*$/i;
const hows = /^(how|huw|hou)'?s[?!.,;:]*$/i;
const howr = /^how'?re?[?!.,;:]*$/i;
const is = /^i?s[?!.,;:]*$/i;
const are = /^(are|r)[?!.,;:]*$/i;

const how_are_things = /^(things|deeds|deals|shits|craps)[?!.,;:]*$/i;
const hows_thing = /^(thing|deed|deal|shit|crap|everythin(g|')?|nothin(g|')?|life|goin(g|')?)[?!.,;:]*$/i;

const your = /^(your|ur)[?!.,;:]*$/i;

const hows_your_stuff = /^(stuff|thing|day|nothing?)[?!.,;:]*$/i;

const do_ = /^(do|doo)[?!.,;:]*$/i;

const have_you = /^have[?!.,;:]*$/i;
const been = /^been[?!.,;:]*$/i;

const it = /^(it|eet)[?!.,;:]*$/i;
const going = /^(goin(g|')?|happenin(g|')?)[?!.,;:]*$/i;

const long = /^long?[?!.,;:]*$/i;
const time = /^time?[?!.,;:]*$/i;
const longtime = /^long?-time[?!.,;:]*$/i;

const no = /^not?[?!.,;:]*$/i;
const see = /^seen?[?!.,;:]*$/i;

const i = /^(i|eye|aye)[?!.,;:]*$/i;
const im = /^i'?m[?!.,;:]*$/i;
const am = /^a?m[?!.,;:]*$/i;

const im_glad = /^(glad|exited|honored)[?!.,;:]*$/i;


const you = /^(you|u|yo)[?!.,;:]*$/i;
const ok = /^(ok(ay|ey)?|alrighty?|fine)[?!.,;:]*$/i;


const what = /^(what|wat)[?!.,;:]*$/i;
const whats = /^(what|wat)'?s[?!.,;:]*$/i;
const whats_up = /^(up|new|crackin(g|')?|happenin(g|')?)[?!.,;:]*$/i;
const on = /^on[?!.,;:]*$/i;
const the = /^(the|da|de)[?!.,;:]*$/i;
const craic = /^(craic|crack|fuck)[?!.,;:]*$/i;

const here = /^(here|hear|heer|hee|he)[?!.,;:]*$/i;
const we = /^(we|wee|vi)[?!.,;:]*$/i;
const go = /^(go|gaw)[?!.,;:]*$/i;


const so = /^(so)[?!.,;:]*$/i;


const its_been__ = /^(ages|decades|years|month|weeks)[?!.,;:]*$/i;
const a = /^a[?!.,;:]*$/i;
const while_ = /^while[?!.,;:]*$/i;
const too = /^(too|2|two)[?!.,;:]*$/i;

const who = /^w?hoo?[?!.,;:]*$/i;

// can be interpreted as either "you" or "yes"
const ya = /^y(e|u|a|o|ee|oo)[?!.,;:]*$/i;



export type shoot = true;

const shoot: shoot = true;

let goodBranch:      nodeC,
    howsChildren:    nodeC[],
    howrChildren:    nodeC[],
    imChildren:      nodeC[],
    whatsChildren:   nodeC[],
    longtimeChildren:nodeC[];

export const start_tree = 
    node(rootRE, [
        node(hello, [], shoot),
        node(greet, [], shoot),
        node(hello_foreign, [], shoot),

        node(guten, [
            node(tag, [], shoot)
        ]),

        goodBranch = node(good, [
            node(timeOfDay, [], shoot),
            node(its_good_to, [
                node(its_good_to_meet, [
                    node(its_good_to_meet_you, [], shoot)
                ])
            ]),
        ]),

        node(its, [
            goodBranch,
            node(been, [
                node(its_been__, [], shoot),
                node(a, [
                    node(while_, [], shoot),
                    node(long, [
                        node(time, [], shoot)
                    ]),
                ]),
                node(too, [
                    node(long, [], shoot),
                ]),
            ])
        ]),

        node(hows, howsChildren = [
            node(hows_thing, [], shoot),
            node(your, [
                node(hows_your_stuff, [], shoot),
            ]),
            node(it, [
                node(going, [], shoot)
            ]),
        ]),
        node(howr, howrChildren = [
            node(how_are_things, [], shoot),
            node(you, [], shoot)
        ]),
        node(how, [
            node(is, howsChildren),
            node(are, howrChildren),
            node(do_, [
                node(you, [
                    node(do_, [], shoot)
                ])
            ]),
            node(have_you, [
                node(you,[
                    node(been, [], shoot)
                ])
            ]),
            node(long, [], shoot)
        ]),

        node(im, imChildren = [
            node(im_glad,[],shoot)
        ]),
        node(i, [
            node(am, imChildren)
        ]),

        node(are, [
            node(you, [
                node(ok, [], shoot)
            ]),
        ]),

        node(whats, whatsChildren = [
            node(whats_up, [], shoot),
            node(the, [
                node(craic, [], shoot)
            ]),
            node(going, [
                node(on, [], shoot),
            ]),
        ]),
        node(what, [
            node(is, whatsChildren),
        ]),

        node(here, [
            node(we, [
                node(go, [], shoot)
            ])
        ]),

        node(ok, [
            node(so, [], shoot)
        ]),

        node(longtime, longtimeChildren=[
            node(no, [
                node(see, [], shoot)
            ]),
        ]),
        node(long, [
            node(time, longtimeChildren),
        ]),

        node(who, [
            node(are, [
                node(you, [], shoot),
                node(ya, [], shoot),
            ]),
        ]),

    ]);





