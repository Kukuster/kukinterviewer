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
         * Processing tree definition. Parses each node only two levels down (up to grandchildren), checking for {`nodeLike`} `SELF` and `PARENTs_CHILDREN`.
         */
        for (let i=0; i<this.children.length; i++) {

            if (this.children[i] === SELF){
                this.children[i] = this;
                continue;

            } else if (this.children[i] === PARENTs_CHILDREN) {
                continue;

            } else if (this.children[i] instanceof nodeC) {

                let igrandchildren = (this.children[i]).children;
                
                for (let j=0; j<igrandchildren.length; j++){
                    
                    if (igrandchildren[j] === PARENTs_CHILDREN){
                        igrandchildren.splice(j, 1, ...this.children);
                        j += this.children.length - 1;
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
 * @param pattern a {`RegExp`} the node is being checked for on the tree traverse.
 * @param children 
 * @param shoot 
 */
export function node(pattern: RegExp, children: nodeLike[], shoot?: any){
    return new nodeC(pattern, children, shoot || null);
}


