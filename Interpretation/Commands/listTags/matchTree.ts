import { tagsQueryShoot } from "../../matchTree/extras/tagsQueryShoot.type";
import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const root = /[\s\S]+/g;
//const list = /^(list|show|get|output|detail|display|reveal|expose|pull|bring|search|find)|$/i;
const list = /^((list|show|detail|reveal|pull|bring|search|find)(ing)?|(get|output)(t?ing)?|(displa(y|ing))|explos(e|ing))$/i;
const turn = /^turn(ing|ed)?[\?\!\.,;:]*$/i
const enable = /^enabl(e|ing|ed)[\?\!\.,;:]*$/i;
const disable = /^disabl(e|ing|ed)[\?\!\.,;:]*$/i;
const on = /^on[\?\!\.,;:]*$/i;
const off = /^off[\?\!\.,;:]*$/i;

const question = /^questions?[\?\!\.,;:]*$/i;
const questions = /^questions[\?\!\.,;:]*$/i;
const questionDigit = /^questions?[\?\!\.,;:]*(#|№|N|n|@)(\d+)[\?\!\.,;:]*/i;
const tag = /#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;
const digit = /(#|№|@|n(um(ber)?)?)?(\d+)(st|nd|rd|th)?[\?\!\.,;:]*/gi;
const all = /^(all|each|every)[\?\!\.,;:]*$/i;
const tagWord = /^(hash)?tag(ged|ging|s)?[\?\!\.,;:]*$/i;
const taggedWord = /^(hash)?tagg?e?d[\?\!\.,;:]*$/i;
const untagWord = /^un(hash)?tag(ged|ging)?[\?\!\.,;:]*$/i;

//forbidden words
const frb = /^(eras(e|ing)|remov(e|ing)|turn(ing)?|delet(e|ing)|eliminat(e|ing)|destro(y|ing)|drop(ping)?|wip(e|ing)|withdraw(ing)?|enabl(e|ing)|disabl(e|ing)|dismiss(ing)|add(ing)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed)?)[\?\!\.,;:]*$/i;

// negation
//const neg = /^(don't|never|not?)*[\?\!\.,;:]*$/i;
const neg = /^(not?|without)[\?\!\.,;:]*$/i;
const dont = /^(do(es)?n'?t|haven'?t|hadn'?t|weren'?t|aren'?t|ain'?t|never)[\?\!\.,;:]*$/i;

const add = /^(add(ing|ed)?|new|creat(e|ing|ed)|insert(ing|ed)?|submit(ing|ed)?|includ(e|ing|ed))[\?\!\.,;:]*$/i;


export type shoot = tagsQueryShoot;

const allShoot:         shoot = 'all';
const enabledShoot:     shoot = { enabled: true };
const disabledShoot:    shoot = { enabled: false };
const qidsShoot:        shoot = { qids: 'some' };


let OnDigitRecursiveShoot: nodeLike,
    OffDigitRecursiveShoot: nodeLike,
    turnOnBranch: nodeLike[],
    turnOffBranch: nodeLike[];


export const listTags_tree =
node(root, [

    

]);
