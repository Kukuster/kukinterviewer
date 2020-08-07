'use strict';

// export const PARENTs_CHILDREN: "parent`s children" = "parent`s children" as const;
// export const SELF: "self" = "self" as const;
//type node = {id: number}
// type nodechild = node | typeof SELF | typeof PARENTs_CHILDREN


/**
 * 
 * @param arr1 array to replace in
 * @param start index in *arr1*, where to inject
 * @param deleteCount no. of elements to delete starting with *start* incl.
 * @param arr2 array of elements to inject from
 * @returns index of the last added element
 */
function replaceInArray(arr1: any[], start: number, deleteCount: number, arr2: any[]) {
    arr1.splice(start, deleteCount);
    
    const arr2len = arr2.length;
    for (let i=0; i<arr2len; ++i) {
        arr1.splice(start + i, 0, arr2[i]);
    }

    return start + arr2len - 1;
}





export interface nodeLike {
    pattern: RegExp | null;
    children: nodeLike[];
    shoot?: any;

    special?: symbol;

    matchedBy(word: string): RegExpMatchArray | null;
    
}


export class nodeLike {

    constructor(pattern: RegExp | null, children: nodeLike[], shoot?: any, special?: symbol){
        this.pattern = pattern;
        this.children = children;
        this.shoot = shoot;
        this.special = special;
    }

    matchedBy(word: string): RegExpMatchArray | null {
        return null;
    }

}


/**
 * if a node has this as a child, this special `nodeLike` will be replaced by oneself in `nodeC` constructor.
 * So the node will have oneself as a child.
 */
export const SELF             = new nodeLike(null, [], null, Symbol('self'));

/**
 * if a node has this as a child, this special `nodeLike` will be replaced by one's own parent's children.
 * So the node will have oneself and one's own siblings as children.
 */
export const PARENTs_CHILDREN = new nodeLike(null, [], null, Symbol('parent`s children'));



/**
 * 
 */
export class nodeC extends nodeLike {
    pattern: RegExp;
    children: nodeLike[];
    shoot?: any;

    constructor(pattern: RegExp, children: nodeLike[], shoot?: any){

        super(pattern, children);
        this.pattern = pattern;
        this.children = children;
        this.shoot = shoot;


        // console.log(this.pattern);
        /**
         * parses each node only two levels down
         */
        for (let i=0; i<this.children.length; i++) {

            // console.log('child #'+i, children[i].pattern || children[i].special);

            if (this.children[i] === SELF){
                this.children[i] = this;
                continue;

            } else if (this.children[i] === PARENTs_CHILDREN) {
                continue;

            } else if (this.children[i] instanceof nodeC) {
                let igrandchildren = (this.children[i]).children;

                // igrandchildren.length && console.log('looping through children of child #'+i+':');
                
                for (let j=0; j<igrandchildren.length; j++){

                    // console.log('grandchild j=#'+j, igrandchildren[j].pattern || igrandchildren[j].special);
                    
                    if (igrandchildren[j] === PARENTs_CHILDREN){
                        // if an i`th child`s child is not a node, but a string 'parent`s children',
                        // it is replaced by one's children, including that i`th child,
                        // meaning, the i`th child`s siblings (and itself) become the children of the i`th child
                        // thus forming an infinitely (recursively) descending branch
                        j = replaceInArray(igrandchildren, j, 1, this.children);
                        // console.log('new j: ', j = replaceInArray(igrandchildren, j, 1, this.children));
                    }
                    
                }

            }

        } // for i (this.children)

    }


    matchedBy(word: string): RegExpMatchArray | null {
        return word.match(this.pattern);
    }


}



export function node(pattern: RegExp, children: nodeLike[], shoot?: any){
    return new nodeC(pattern, children, shoot || null);
}












// // TEST replaceInArray

// let parents_children: ({id: number}|string)[] = [{id: 1}, {id: 2}, {id:3}, {id:4}]
// let children: ({id: number}|string)[] = [{id: 11},{id: 12},{id: 13},'parent`s children',{id: 14}, {id: 15}]

// console.log('`children` before injection');
// let chilen = children.length;
// for (let i=0; i<chilen; i++){
//     console.log(i, ': ', children[i]);
// }

// let new_index = replaceInArray(children,3,1,parents_children);

// console.log();
// console.log('`children` after injection');
//     chilen = children.length;
// for (let i = 0; i < chilen; i++) {
//     console.log(i, ': ', children[i]);
// }


// console.log();
// console.log('returned `new_index`: '+new_index);




