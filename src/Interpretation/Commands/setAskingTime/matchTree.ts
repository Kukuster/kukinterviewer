import { node, nodeLike, nodeC } from "../../matchTree/node";


// any punctuation mark at the end:
// [?!.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;

const nullRE = /(?!x)x/;


// const list = /^((list|show|detail|reveal|pull|bring|search|find)(ing)?|(get|output)(t?ing)?|(displa(y|ing))|explos(e|ing))$/i;

const ask_ing = /^(ask(ing)?|giv(e|ing))[?!.,;:]*$/i;

const me = /^me[?!.,;:]*$/i;

const question_s = /^questions?[?!.,;:]*$/i;



const every = /^(every|each)[?!.,;:]*$/i;
const number = /^(\d+\.?|\d*\.\d+)[?!.,;:]*$/i;
const timeunit = /^(nanosecond|ns|µs|μs|us|microsecond|millisecond|ms|second|sec|s|minute|min|hour|hr|h|day|d|week|wk|w|month|m|b|year|yr|y)s?[?!.,;:]*$/i;

const timeunit_ly = /^(bi)?(hourly|daily|weekly|monthly|yearly|annually)[?!.,;:]*$/i;

const regularly = /^regularly[?!.,;:]*$/i;

const clock =     /^(0?\d|1\d|2[01234])((:|;|.|,)([012345]\d))?[?!.,;:]*$/i;
const clock_h_m = /^(0?\d|1\d|2[01234])(:|;|.|,)([012345]\d)[?!.,;:]*$/i;
const clock_h =   /^(0?\d|1\d|2[01234])[?!.,;:]*$/i;

const meridiem = /^([ap]\.?m\.?)[?!.,;:]*$/i;


const date = /^((0?\d|1[012])[./](0?\d|1\d|2\d|3[01])[./](\d?\d|20(\d\d))|(0?\d|1\d|2\d|3[01])[./](0?\d|1[012])[./](\d?\d|20(\d\d)))[?!.,;:]*$/i;
const clock_or_date = /^(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?[?!.,;:]*$/i;
const day = /^(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?)[?!.,;:]*$/i;
const tomorrow = /^tomorrow[?!.,;:]*$/i;
const dayOfMonth = /^((\d{1,2})\s*(st|nd|rd|th))[?!.,;:]*$/i;
const month = /^(january|february|march|april|may|june|july|august|september|october|november|december)[?!.,;:]*$/i;
const dayMod = /^(morning|noon|afternoon|night|evening|midnight)[?!.,;:]*$/i;
const usual_timeunit = /^(sec(ond)?|min(ute)?|h|hr|our|d|day|w|wk|week|m|month|y|yr|year)[?!.,;:]*$/i;


const next = /^(next|another)[?!.,;:]*$/i;

const time = /^(time|occasion|one)[?!.,;:]*$/i;

const from = /^from[?!.,;:]*$/i;
const to =     /^to[?!.,;:]*$/i;
const at = /^(at|@|on)[?!.,;:]*$/i;

const up = /^up[?!.,;:]*$/i;

const until = /^(untill?|before|to)[?!.,;:]*$/i;

const after = /^after[?!.,;:]*$/i;

const nolater = /^nolater(than)?[?!.,;:]*$/i;
const no =      /^(not?|nah?)[?!.,;:]*$/i;
const later =       /^later[?!.,;:]*$/i;
const than =         /^than[?!.,;:]*$/i;


const finish = /^(finish(ing)?|stop|end|terminat(e|ing|ed)|turnoff|disabl(e|ing|ed)|deactivat(e|ing|ed))[?!.,;:]*$/i;

const start  = /^(start(ing)?|begin(ning)?)[?!.,;:]*$/i;





const dont = /^(don'?t|never|not?)+[?!.,;:]*$/i;


const continue_ = /^(continue|keep)[?!.,;:]*$/i;



const frb = /^((hash)?tag(ged|ging)|question(ed|ing)|eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing|ed)|eliminat(e|ing|ed)|destro(y|ing|ed)|drop(ping|ped)?|wip(e|ing|ed)|withdraw(ing|ed)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?)[?!.,;:]*$/i;




////////////////// SHOOTS //////////////////

export type interval_shoot = 'interval (amount)' | 'interval (timeunit)' | 'interval (adverb)' | 'interval "regularly"' | 'interval word';
export type     from_shoot =       'from (time)' | 'from (meridiem)';
export type       to_shoot =         'to (time)' |   'to (meridiem)';
export type       at_shoot = 'at (point of time)' |   'at (time difference)' | 'at (either a point or a difference)';


export type shoot = interval_shoot | from_shoot | to_shoot | at_shoot;
// export type shoot = [parameter, ...parameter[]];


// let root_children: nodeLike[];

const nullnode = node(nullRE, []);

let  start_ask_me_branch,
    finish_ask_me_branch,
    ask_questions_branch,
      dont_ask_me_branch,
    dont_start_ask_me_branch,
   dont_finish_ask_me_branch: nodeLike[];


////////////////// //////////////////



////////////////// BRANCH //////////////////

const THIS_BRANCH_ITSELF = new nodeLike(null, [], null, Symbol('a tip (top node) of this branch itself'));

/**
 * Creates a node that equals to `definition`.
 * `fork` array may be referenced anywhere in the `definition`.
 * `fork` array is being parsed for symbolic nodeLikes, and may mutate.
 * @param definition the definition of the branch
 * @param forks parts of the definition which may be mutated if contains nodeLike values
 */
export function BRANCH(definition: nodeC, forks?: nodeLike[][]): nodeC;
export function BRANCH(definition: nodeLike[], forks?: nodeLike[][]): nodeLike[];
export function BRANCH(definition: nodeC | nodeLike[], forks?: nodeLike[][]) {
    const b = definition;
    if (forks) {
        forks.forEach(fork => {
            for (let i = 0; i < fork.length; i++) {
                /**
                 * if any of the direct children in `fork` happen to be `THIS_BRANCH_ITSELF`,
                 * replace them with the branch definition
                 */
                if (fork[i] === THIS_BRANCH_ITSELF) {
                    if (Array.isArray(b)) {
                        fork.splice(i, 1, ...b);
                        i += b.length - 1;
                    } else {
                        fork[i] = b;
                    }
                }
            }
        });
    }
    return b;
}

//////////////////  //////////////////






////////////////// BRANCH BLANKS //////////////////

// [-> number ] -> timeunit
const INTERVAL = (fork: nodeLike[], deadLeaf?: RegExp, shoot_amount?: shoot, shoot_timeunit?: shoot, shoot_timeunitWithoutAmount?: shoot) => BRANCH([
    node(number, [
        node(timeunit, fork, shoot_timeunit as shoot),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ], shoot_amount as shoot),
    node(timeunit, fork, shoot_timeunitWithoutAmount as shoot),
], [fork]);


// every [-> number ] -> timeunit
const EVERY_INTERVAL = (fork: nodeLike[], deadLeaf?: RegExp, shoot_amount?: shoot, shoot_timeunit?: shoot, shoot_timeunit_ly?: shoot, shoot_timeunitWithoutAmount?: shoot) => BRANCH([
    node(every, [
        ...INTERVAL([THIS_BRANCH_ITSELF, ...fork], deadLeaf, shoot_amount, shoot_timeunit, shoot_timeunitWithoutAmount),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    node(timeunit_ly, fork, shoot_timeunit_ly as shoot),
], [fork]);


// clock number [-> 12-hour period]
const TIMECLOCK = (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH(
    node(clock, [
        node(meridiem, fork, shoot_meridiem as shoot),
        ...fork,
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ], shoot_time as shoot)
, [fork]);


const BLANK_timeclock = (firstRegExp: RegExp) =>
    (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH(
        node(firstRegExp, [
            TIMECLOCK(fork, deadLeaf, shoot_time, shoot_meridiem),
            deadLeaf ? node(deadLeaf, []) : nullnode,
        ])
    , [fork]);



// from -> clock number [-> 12-hour period]
const FROM_timeclock =  BLANK_timeclock(from);

// to -> clock number [-> 12-hour period]
const TO_timeclock =    BLANK_timeclock(to);

// at -> clock number [-> 12-hour period]
const AT_timeclock =    BLANK_timeclock(at);


// (until|before) -> clock number [-> 12-hour period]
const UNTIL_timeclock = BLANK_timeclock(until);

// after -> clock number [-> 12-hour period]
const AFTER_timeclock = BLANK_timeclock(after);


//      from               -> clock number [-> 12-hour period]
// starting [-> (from|at)] -> clock number [-> 12-hour period]
const STARTING_FROM_timeclock =  (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH([
    FROM_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
    node(start, [
        FROM_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        AT_timeclock  (fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    AFTER_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
], [fork]);

// starting [-> (from|at)] -> clock number [-> 12-hour period]
const STARTING_timeclock =  (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH([
    node(start, [
        FROM_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        AT_timeclock  (fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    AFTER_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
], [fork]);


//   (before|until|to)      ->  clock number [-> 12-hour period]
//    up -> (until|to)      ->  clock number [-> 12-hour period]
// finishing -> (before|at) ->  clock number [-> 12-hour period]
const FINISHING_UPTO_timeclock = (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH([
    UNTIL_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
    node(up, [
        UNTIL_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    node(finish, [
        UNTIL_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        AT_timeclock   (fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
], [fork]);

//    up -> (until|to)      ->  clock number [-> 12-hour period]
// finishing -> (before|at) ->  clock number [-> 12-hour period]
const FINISHING_timeclock = (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH([
    node(up, [
        UNTIL_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    node(finish, [
        UNTIL_timeclock(fork, deadLeaf, shoot_time, shoot_meridiem),
        AT_timeclock   (fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
], [fork]);


//  regularly
// [regularly -> ] every -> [number -> ] timeunit
// [regularly -> ] timeunit_ly
/**
 * 
 * @param fork 
 * @param deadLeaf 
 * @param shoot_amount 
 * @param shoot_timeunit 
 * @param shoot_timeunit_ly 
 * @param shoot_regularly 
 * @param shoot_every 
 * @param shoot_timeunitWithoutAmount means a timeunit was referenced in text without number before it ("a minute")
 */
const REGULARITY_INTERVAL = (fork: nodeLike[], deadLeaf?: RegExp, shoot_amount?: shoot, shoot_timeunit?: shoot, shoot_timeunit_ly?: shoot, shoot_regularly?: shoot, shoot_every?: shoot, shoot_timeunitWithoutAmount?: shoot) => BRANCH([
    node(regularly, [
        ...EVERY_INTERVAL(fork, deadLeaf, shoot_amount, shoot_timeunit, shoot_timeunit_ly, shoot_timeunitWithoutAmount),
        ...fork,
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ], shoot_regularly as shoot),
    ...EVERY_INTERVAL(fork, deadLeaf, shoot_amount, shoot_timeunit, shoot_timeunit_ly, shoot_timeunitWithoutAmount),
], [fork]);


/**
 * @param fork this indermediate branch branches out to this array
 * @param deadLeaf non-shoot leaf
 * @param shoot_tbd means something about a time was referenced in text. This is to be clarified later in the branch.
 * @param shoot_timepoint means a particular point of time was referenced in text, so the parsed datetime should be shifted in accord to user's timezone
 * @param shoot_timediff means a time difference was referenced in text (e.g. "2 hours later"), so the parsed datetime left as is
 */
const NEXTTIME_datetime = (fork: nodeLike[], deadLeaf?: RegExp, shoot_tbd?: shoot, shoot_timepoint?: shoot, shoot_timediff?: shoot) => BRANCH([
    
    node(timeunit, fork = [
        ...fork,
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ], shoot_timediff as shoot),
    
    node(date, fork, shoot_timepoint as shoot),
    node(clock_h_m, [
        node(meridiem, fork, shoot_timepoint as shoot),
        ...fork,
    ], shoot_timepoint as shoot),
    
    // this may match any number from 0 to 24
    node(clock_h, [
        node(meridiem, fork, shoot_timepoint as shoot),
        node(timeunit, fork, shoot_timediff as shoot),
        ...fork,
    ], shoot_tbd as shoot),

    node(number, [
        node(timeunit, fork, shoot_timediff as shoot),
        ...fork,
    ], shoot_timediff as shoot),

    node(day, fork, shoot_timepoint as shoot),
    node(tomorrow, fork, shoot_timediff as shoot),
    node(dayOfMonth, fork, shoot_timepoint as shoot),
    node(month, fork, shoot_timepoint as shoot),
    node(dayMod, fork, shoot_timepoint as shoot),
    node(usual_timeunit, fork, shoot_timepoint as shoot),
    node(later, fork, shoot_tbd as shoot),
    // node(at, fork),
], [fork]);


//  nolater    ->  clock number [-> 12-hour period]
// no -> later ->  clock number [-> 12-hour period]
const NOLATER = (fork: nodeLike[], deadLeaf?: RegExp, shoot_time?: shoot, shoot_meridiem?: shoot) => BRANCH([
    node(nolater,[
        TIMECLOCK(fork, deadLeaf, shoot_time, shoot_meridiem),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
    node(no, [
        node(later, [
            TIMECLOCK(fork, deadLeaf, shoot_time, shoot_meridiem),
            deadLeaf ? node(deadLeaf, []) : nullnode,
        ]),
        deadLeaf ? node(deadLeaf, []) : nullnode,
    ]),
], [fork]);



////////////////// //////////////////




////////////////// matchTree //////////////////

export const setAskingTime_tree =
    node(root, [

        node(ask_ing, [

            // ask ->
            node(question_s, ask_questions_branch = [
                ...REGULARITY_INTERVAL([
                    // ask -> question[s]
                    ...STARTING_FROM_timeclock([
                        ...FINISHING_UPTO_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'to (time)', 'to (meridiem)'),
                        node(frb, []),
                    ], frb, 'from (time)', 'from (meridiem)'),

                    // ask -> question[s]
                    ...FINISHING_UPTO_timeclock([
                        ...STARTING_FROM_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'from (time)', 'from (meridiem)'),
                        node(frb, []),
                    ], frb, 'to (time)', 'to (meridiem)'),

                ], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                
                // ask -> question[s]
                ...STARTING_FROM_timeclock([
                    ...FINISHING_UPTO_timeclock([
                        ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                        node(frb, []),
                    ], frb, 'to (time)', 'to (meridiem)'),
                    node(frb, []),
                ], frb, 'from (time)', 'from (meridiem)'),

                // ask -> question[s]
                ...FINISHING_UPTO_timeclock([
                    ...STARTING_FROM_timeclock([
                        ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                        node(frb, []),
                    ], frb, 'from (time)', 'from (meridiem)'),
                    node(frb, []),
                ], frb, 'to (time)', 'to (meridiem)'),

                // ask -> question[s]
                ...NOLATER([], frb,  'to (time)', 'to (meridiem)'),

                // ask -> question[s]
                // AT_timeclock([], frb, 'at (time)', 'at (meridiem)'),
                ...NEXTTIME_datetime([THIS_BRANCH_ITSELF], frb, 'at (either a point or a difference)', 'at (point of time)', 'at (time difference)'),

                node(frb, []),
            ]),

            // ask ->
            node(me, [
                node(no, dont_ask_me_branch = [
                    node(later, [
                        TIMECLOCK([], frb, 'to (time)', 'to (meridiem)'),
                        node(frb, []),
                    ]),
                    UNTIL_timeclock([
                        AFTER_timeclock([], frb, 'to (time)', 'to (meridiem)'),
                    ], frb, 'from (time)', 'from (meridiem)'),
                    AFTER_timeclock([
                        UNTIL_timeclock([], frb, 'from (time)', 'from (meridiem)'),
                    ], frb, 'to (time)', 'to (meridiem)'),
                    // questions([...PARENT'S CHILDREN])
                    node(frb, []),
                ]),
                node(nolater, [
                    TIMECLOCK([], frb, 'to (time)', 'to (meridiem)'),
                    node(frb, []),
                ]),
                ...ask_questions_branch
            ]),

            // ask ->

            node(frb, []),
        ]), // ask

        node(next, [
            // next -> 
            node(question_s, [
                // next -> question[s] -> 
                // AT_timeclock([], frb, 'at (time)', 'at (meridiem)'),
                ...NEXTTIME_datetime([THIS_BRANCH_ITSELF], frb, 'at (either a point or a difference)', 'at (point of time)', 'at (time difference)'),
                node(frb, []),
            ]),

            // next -> 
            node(time, [
                node(ask_ing, [
                    node(me, [
                        // next -> time -> ask[ing] -> me ->  
                        // AT_timeclock([], frb, 'at (time)', 'at (meridiem)'),
                        ...NEXTTIME_datetime([THIS_BRANCH_ITSELF], frb, 'at (either a point or a difference)', 'at (point of time)', 'at (time difference)'),
                    ]),
                ]),
            ]),

            node(frb, []),
        ]), // next


        node(start, [
            // start ->
            node(ask_ing, [
                // start -> ask[ing]
                node(question_s, [
                    // start -> ask[ing] -> question[s]
                    ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),

                    // start -> ask[ing] -> question[s]
                    AT_timeclock([
                        ...FINISHING_UPTO_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'to (time)', 'to (meridiem)'),
                    ], frb, 'from (time)', 'from (meridiem)'),

                    // start -> ask[ing] -> question[s]
                    ...STARTING_FROM_timeclock([], frb, 'from (time)', 'from (meridiem)'),

                    // start -> ask[ing] -> question[s]
                    node(frb, []),
                ]),

                // start -> ask[ing]
                node(me, start_ask_me_branch = [
                    AT_timeclock([
                        ...FINISHING_UPTO_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'to (time)', 'to (meridiem)'),
                    ], frb, 'from (time)', 'from (meridiem)'),
                    ...STARTING_FROM_timeclock([], frb, 'from (time)', 'from (meridiem)'),
                    node(frb, []),
                ]),

                // start -> ask[ing]
                ...start_ask_me_branch,

                node(frb, []),
            ]),

            // start ->

            node(frb, []),
        ]), // start

        
        node(finish, [
            // finish ->
            node(ask_ing, [
                // finish -> ask[ing]
                node(question_s, [

                    // finish -> ask[ing] -> question[s]
                    AT_timeclock([
                        ...STARTING_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'from (time)', 'from (meridiem)'),
                    ], frb, 'to (time)', 'to (meridiem)'),

                    // finish -> ask[ing] -> question[s]
                    ...FINISHING_UPTO_timeclock([], frb, 'to (time)', 'to (meridiem)'),

                    // finish -> ask[ing] -> question[s]
                    node(frb, []),
                ]),

                // finish -> ask[ing]
                node(me, finish_ask_me_branch = [
                    AT_timeclock([
                        ...STARTING_timeclock([
                            ...REGULARITY_INTERVAL([], frb, 'interval (amount)', 'interval (timeunit)', 'interval (adverb)', 'interval "regularly"', 'interval word'),
                            node(frb, []),
                        ], frb, 'from (time)', 'from (meridiem)'),
                    ], frb, 'to (time)', 'to (meridiem)'),
                    ...FINISHING_UPTO_timeclock([], frb, 'to (time)', 'to (meridiem)'),
                    node(frb, []),
                ]),

                // finish -> ask[ing]
                ...finish_ask_me_branch,

                node(dont, []),
                node(frb, []),
            ]),

            // finish ->

            node(dont, []),
            node(frb, []),
        ]), // finish




        node(dont, [
            // don't -> 

            node(ask_ing, [
                // don't -> ask
                node(question_s, dont_ask_me_branch),

                // don't -> ask
                node(me, dont_ask_me_branch),
                node(frb, []),
            ]),

            // don't -> 
            node(start, [
                // don't -> start -> 
                node(ask_ing, [
                    // don't -> start -> ask[ing]
                    node(question_s, dont_start_ask_me_branch = [
                        UNTIL_timeclock([], frb, 'from (time)', 'from (meridiem)'),
                        node(frb, []),
                    ]),
                    // don't -> start -> ask[ing]
                    node(me, dont_start_ask_me_branch),
                    node(frb, []),
                ]),
                node(frb, []),  
            ]),
            node(frb, []),

            // don't -> 
            node(finish, [
                // don't -> finish -> 
                node(ask_ing, [
                    // don't -> finish -> ask[ing]
                    node(question_s, dont_finish_ask_me_branch = [
                        UNTIL_timeclock([], frb, 'to (time)', 'to (meridiem)'),
                        node(frb, []),
                    ]),
                    // don't -> finish -> ask[ing]
                    node(me, dont_finish_ask_me_branch),
                    node(frb, []),
                ]),
                node(frb, []),
            ]),
            node(frb, []),

        ]),



        node(frb, []),
    ]);

////////////////// //////////////////





