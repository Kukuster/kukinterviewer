'use strict';

import { nodeLike } from "./node";

export type treeStep = { childIndex: number; match: RegExpMatchArray; word: string; shoot: any; };

/**
 * 
 * @param node a tree to traverse
 * @param Words strings to use to walk on a tree. The function usually exhausts this array, or if not, then the path ended on a node without children.
 * @param path steps made through the tree are appended to this array
 * @param unmatchedLimit limit of how many words in a row are allowed to fail to match any of the current node children. When exceeded, breaks the tree.
 * @returns `path`, but it rewrites `path` argument (passed by reference, because it's an array)
 */
export function traverse(node: nodeLike, Words: string[], path: treeStep[], unmatchedLimit: number = -1) {
    let word: string, match: RegExpMatchArray | null;

    if (!node.children || node.children.length === 0 || Words.length === 0) {
        return void(0);
    }

    let unmatchedInARow = 0;


    words: while (Words.length > 0) {
        word = Words.shift() || '';  // empty string never happens, but is only to convince TypeScript that it will always be a string

        const node_children_length = node.children.length;
        children: for (let i=0; i<node_children_length; i++) {
            match = null;
            if (match = node.children[i].matchedBy(word)) {

                path.push({
                    'childIndex': i,
                    'match': match,
                    'word': word,
                    'shoot': node.children[i].shoot
                });

                traverse(node.children[i], Words, path, unmatchedLimit);
                break words;

            }
        } // for i in children

        unmatchedInARow++;
        if (unmatchedLimit > -1 && unmatchedInARow > unmatchedLimit) {
            path.push({
                'childIndex': -1,
                'match': [],
                'word': 'umatched ' + unmatchedLimit + 1 + ' words in a row, breaking the tree',
                'shoot': null,
            });
            break words;
        }

    } // looping through words

}
