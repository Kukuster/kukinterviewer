import { node, nodeLike, SELF, PARENTs_CHILDREN } from "../../matchTree/node";


// any punctuation mark at the end: 
// [\?\!\.,;:]*$
// (?:\?|\!|\.|,|;|:|$)+
const rootRE = /[\s\S]+/g;
const turnRE = /^turn(ing|ed)?[\?\!\.,;:]*$/i
const enableRE  =  /^enabl(e|ing|ed)[\?\!\.,;:]*$/i;
const disableRE = /^disabl(e|ing|ed)[\?\!\.,;:]*$/i;
const onRE  =  /^on[\?\!\.,;:]*$/i;
const offRE = /^off[\?\!\.,;:]*$/i;
const questionRE = /^questions?(\S*)*/i;
const allRE = /^(all|each|every)[\?\!\.,;:]*$/i;
const digitRE = /(\d+)/g;



export type shoot = {  };

const aShoot  :shoot = {   };


let OnDigitRecursiveShoot: nodeLike,
    OffDigitRecursiveShoot: nodeLike,
    turnOnBranch: nodeLike[],
    turnOffBranch: nodeLike[];


export const askMeAQuestion_tree =
    node(rootRE, [


    ]);
