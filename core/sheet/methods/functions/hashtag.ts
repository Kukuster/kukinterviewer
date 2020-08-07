/**
 * 
 * `test` method of _global_ RegExp rewrites it's property `lastIndex`. This makes `test` methods of such `RegExp`'s, if defined as const, unpure. In fact, so unpure, it produces different results in different JS engines with the same data!
 * 
 * These functions make sure that corresponding validate functions are pure and do output predictable result.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Using_test_on_a_regex_with_the_global_flag
 * 
 */
function IS_TAG_STR()   { return  /^([0-9_]*([a-zA-Z]+[0-9_]*)+)$/g; }
function IS_TAG_wHASH() { return /^#([0-9_]*([a-zA-Z]+[0-9_]*)+)$/g; }
function TAG_IN_A_WORD(){ return /^#([0-9_]*([a-zA-Z]+[0-9_]*)+)/g;  }


export function validateTagStr(tagStr: string){
    return IS_TAG_STR().test(tagStr);
}


export function validateTagStr_wHash(tagStr_wHash: string){
    return IS_TAG_wHASH().test(tagStr_wHash);
}



/**
 * Tags;
 * - may include only alphanumerics and underscore
 * - may not contain only digits and underscores (has to contain at least one alphabet char)
 * - no non-whitespace can precede the hashtag sign
 * 
 * @param text
 * 
 */
export function parseTags(text: string): string[] | undefined {
    const words = text.match(/\S+/g);

    let   tags = words?.map(word => {
        const match = word.match(TAG_IN_A_WORD());
        return match ? match[0] : null;
    });
    
    tags = tags?.filter(t => t);
    // now if `tags` is not empty, it may only have strings

    return tags?.map(t => stripLeadingHash(<string>t));
    
}


export function validateTags(Tags: string[]){
    return Tags.filter(t => validateTagStr(t));
}



export function stripLeadingHash(tag: string){
    const stripped = tag.match(/#(\S+)/);
    return stripped ? stripped[1] : tag;
}

