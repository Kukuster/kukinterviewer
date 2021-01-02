/** Mark some properties which only the former including as optional and set the value to never */
declare type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};

/** get the XOR type which could make 2 types exclude each other */
export declare type XOR<T, U> = T | U extends Record<string | number, unknown> ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type XOR3<T1, T2, T3> = XOR<T1, XOR<T2, T3>>;
export type XOR4<T1, T2, T3, T4> = XOR<T1, XOR3<T2, T3, T4>>;
export type XOR5<T1, T2, T3, T4, T5> = XOR<T1, XOR4<T2, T3, T4, T5>>;
export type XOR6<T1, T2, T3, T4, T5, T6> = XOR<T1, XOR5<T2, T3, T4, T5, T6>>;
export type XOR7<T1, T2, T3, T4, T5, T6, T7> = XOR<T1, XOR6<T2, T3, T4, T5, T6, T7>>;
export type XOR8<T1, T2, T3, T4, T5, T6, T7, T8> = XOR<T1, XOR7<T2, T3, T4, T5, T6, T7, T8>>;
export type XOR9<T1, T2, T3, T4, T5, T6, T7, T8, T9> = XOR<T1, XOR8<T2, T3, T4, T5, T6, T7, T8, T9>>;
