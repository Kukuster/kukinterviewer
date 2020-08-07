import { nodeC, nodeLike } from "./node";


export type nodeStep = { childIndex: number; match: RegExpMatchArray; word: string; shoot: any; };


export function walk(node: nodeLike, Words: string[], path: nodeStep[]) {
    let word: string, match: RegExpMatchArray | null;
    //console.log('walk: on node ' + node.match.source);
    if (!node.children || node.children.length === 0 || Words.length === 0) {
        return path;
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
