import { ArrayElement } from "./ArrayElement.type";


/**
 * 
 * Excludes:
 *  - elements of Array2 from Array1
 *  - type of Array2 from Array1
 * 
 * @param Array1 An array to exclude elements from
 * @param Array2 An array of elements to exclude
 */
export default function excludeFromTypedArray<T1 extends T3, T2 extends T3, T3 = T1 | T2>(Array1: T1[], Array2: T2[])
    : Array< Exclude<T1, T2> >;

export default function excludeFromTypedArray<T1 extends T3, T2 extends T3, T3 = T1 | T2>(Array1: readonly T1[], Array2: T2[])
    : Array< Exclude<T1, T2> >;

export default function excludeFromTypedArray<T1 extends T3, T2 extends T3, T3 = T1 | T2>(Array1: T1[], Array2: readonly T2[])
    : Array< Exclude<T1, T2> >;

export default function excludeFromTypedArray<T1 extends T3, T2 extends T3, T3 = T1 | T2>(Array1: readonly T1[], Array2: readonly T2[])
    : Array< Exclude<T1, T2> >;

export default function excludeFromTypedArray<T1 extends T3, T2 extends T3, T3 = T1 | T2>(Array1: readonly T3[], Array2: readonly T3[])
    : Array< Exclude<ArrayElement<typeof Array1>, ArrayElement<typeof Array2>> >{
    return Array1.filter(v => Array2.indexOf(v) === -1) as Array< Exclude<ArrayElement<typeof Array1>, ArrayElement<typeof Array2>> >;
}

