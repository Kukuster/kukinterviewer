// other methods:
// https://stackoverflow.com/a/43046408
/**
 * returns new array with all unique values from the given array
 */
export function uniquifyArray(ar: any[]) {
    var j: {[key:string]: any} = {};

    ar.forEach(function (v) {
        j[v + '::' + typeof v] = v;
    });

    return Object.keys(j).map(function (v) {
        return j[v];
    });
} 

/**
 * Cuts the given _string_ from the beginning up to the first occurance of a given _substring_ inclusively, ignoring case of the _substring_
 * @param s a _string_ to cut
 * @param ss a _substring_ to search for the first occurance and cut up to (inclusively)
 */
export const cutOffUpToWithFirstOccurance = (s: string, ss: string) => s.replace(new RegExp('^(.|\r|\n)*?' + ss, 'i'), '');
// (.|\r|\n)* matches anything of any length
// ? at the end means non-greedy


/**
 * Cuts the given _string_ from the first occurance of a given _substring_ inclusively up to the end, ignoring case of the _substring_
 * @param s a _string_ to cut
 * @param ss a _substring_ to search for the first occurance and cut from (inclusively)
 */
export const cutOffFromWithFirstOccurance = (s: string, ss: string) => s.replace(new RegExp(ss + '(.|\r|\n)*?$', 'i'), '');
// (.|\r|\n)* matches anything of any length
// ? at the end means non-greedy
