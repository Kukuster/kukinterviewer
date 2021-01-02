/**
 * Checks whether 2 arrays of primitive types are equal sets. Works on average in _O(n)_
 * - [source](https://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values/55614659#55614659)
 * @param {} a1 an array of primitives
 * @param {} a2 an array of primitives
 */
export function arraysAreEqualSets(a1: unknown[], a2: unknown[]) {
    const superSet: { [key: string]: unknown } = {};
    for (const i of a1) {
        const e = i + typeof i;
        superSet[e] = 1;
    }

    for (const i of a2) {
        const e = i + typeof i;
        if (!superSet[e]) {
            return false;
        }
        superSet[e] = 2;
    }

    for (let e in superSet) {
        if (superSet[e] === 1) {
            return false;
        }
    }

    return true;
}
