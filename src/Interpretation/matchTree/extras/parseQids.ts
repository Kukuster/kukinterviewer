/**
 * 
 * An extension to `parseInt`, which also works for strings like `'#30'`, and a bit more.
 * 
 * @param str a string that may cotain digits
 * 
 * @returns returns an array of non-NaN numbers or undefined
 */
export default function (str: string) {
    let int = parseInt(str);

    if (int) {
        return [int];

    } else {

        //if parseInt fails us, we can do better
        const match = str.match(/(\d+)/g);
        return match && match.length ?
            match?.map(d => parseInt(d)) :
            null;

    };
};
