'use strict';

import { nodeLike } from "./node";


export type treeStep = { childIndex: number; match: RegExpMatchArray; word: string; shoot: any; };


/**
 * 
 * @param node a tree to traverse
 * @param Words strings to use to walk on a tree. The function usually exhausts this array, or if not, then the path ended on a node without children.
 * @param path steps made through the tree are appended to this array
 * @returns `path`, but it rewrites `path` argument (passed by reference, because it's an array)
 */
export function traverse(node: nodeLike, Words: string[], path: treeStep[]) {
    let word: string, match: RegExpMatchArray | null;

    if (!node.children || node.children.length === 0 || Words.length === 0) {
        return void(0);
    }

    words: while (Words.length > 0) {
        word = Words.shift() || '';  // empty string never happens, but is only to convince TypeScript that it will always be a string

        const node_children_length = node.children.length;
        children: for (let i=0; i<node_children_length; i++) {
            // console.log(`trying "${word}" against ${node.children[i].pattern}`);
            match = null;
            if (match = node.children[i].matchedBy(word)) {

                path.push({
                    'childIndex': i,
                    'match': match,
                    'word': word,
                    'shoot': node.children[i].shoot
                });

                traverse(node.children[i], Words, path);
                break words;
            }
        }
    }

}
