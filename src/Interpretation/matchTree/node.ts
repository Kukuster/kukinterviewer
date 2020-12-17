'use strict';


export interface nodeLike {
    pattern: RegExp | null;
    children: nodeLike[];
    shoot?: any;
    special?: symbol;
    matchedBy(word: string): RegExpMatchArray | null;
}

/**
 * A building block of a _matchTree_
 */
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
 * if a node has this as a child, this special `nodeLike` will be replaced by one's own parent's children in `nodeC` constructor.
 * So the node will have oneself and one's own siblings as children.
 */
export const PARENTs_CHILDREN = new nodeLike(null, [], null, Symbol('parent`s children'));

/**
 * if a node has this as a child, this special `nodeLike` will be replaced by one's own parent.
 * So the node will have it's PARENT as a child, and therefore itself as a grandchild.
 */
export const PARENT           = new nodeLike(null, [], null, Symbol('parent'));


/**
 * A main building block of a tree. A tree must have `nodeC` instance as a root node, and a processed tree should have only `nodeC` instances
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

        /**
         * Processing tree definition. Parses each node only two levels down (up to grandchildren), checking for {`nodeLike`} `SELF`, `PARENT`, and `PARENTs_CHILDREN`.
         */
        for (let i=0; i<this.children.length; i++) {

            if (this.children[i] === SELF){
                this.children[i] = this;
                continue;

            } else if (this.children[i] === PARENTs_CHILDREN || this.children[i] === PARENT) {
                continue;

            } else if (this.children[i] instanceof nodeC) {

                const igrandchildren = (this.children[i]).children;
                
                for (let j=0; j<igrandchildren.length; j++){
                    
                    if (igrandchildren[j] === PARENTs_CHILDREN){
                        igrandchildren.splice(j, 1, ...this.children);
                        j += this.children.length - 1;

                    } else if (igrandchildren[j] === PARENT) {
                        igrandchildren[j] = this;
                    } 
                    
                }

            }

        } // for i (this.children)

    } //constructor


    matchedBy(word: string): RegExpMatchArray | null {
        return word.match(this.pattern);
    }


} // nodeC



/**
 * 
 * @param pattern on tree traverse, if an iterating word {`string`} matches this _pattern_, then `tranverse` function steps on this `node` and continues on checking its _children_
 * @param children when on current `node`, its _children_ are checked for their _pattern_
 * @param shoot sets _shoot_ property to a new `node`. A `node` which has this non-falsy property is _a shoot_. Only if tree traverse ends on a _shoot_, then the tree is considered to be traversed successfully, and the _shoot_ value is used as the result. _A shoot_ is not necessarily _a leaf_.
 */
export function node(pattern: RegExp, children?: nodeLike[], shoot?: any){
    return new nodeC(pattern, children || [], shoot || null);
}


