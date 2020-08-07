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
