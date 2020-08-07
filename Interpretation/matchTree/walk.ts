'use strict';

import { nodeC, nodeLike } from "./node";


export type nodeStep = { childIndex: number; match: RegExpMatchArray; word: string; shoot: any; };


/**
 * 
 * @param node a tree to traverse
 * @param Words strings to use to walk on a tree
 * @param path steps made through the tree are appended to this array
 * @returns void, but it rewrites `path` argument (passed by reference, because it's an array)
 */
export function walk(node: nodeLike, Words: string[], path: nodeStep[]) {
    let word: string, match: RegExpMatchArray | null;
    //console.log('walk: on node ' + node.match.source);
    if (!node.children || node.children.length === 0 || Words.length === 0) {
        return void(0);
    }
    //console.log('{');
    //console.log('walk: looping...');
    words: while (Words.length > 0) {
        word = Words.shift() || '';  // empty string never happens, but is only to convince TypeScript that it will always be a string
        //console.log('word: '+word);
        const node_children_length = node.children.length;
        children: for (let i=0; i<node_children_length; i++) {
            match = null;
            if (match = node.children[i].matchedBy(word)) {
                //console.log(match);
                path.push({
                    'childIndex': i,
                    'match': match,
                    'word': word,
                    'shoot': node.children[i].shoot
                });
                //console.log('path:');
                //console.log(path);
                walk(node.children[i], Words, path);
                break words;
            }
        }
    }

    //console.log('}');
}
