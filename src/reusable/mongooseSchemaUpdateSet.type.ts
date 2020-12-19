/**
 * Returns an interface stripped of all keys that don't resolve to U, defaulting 
 * to a non-strict comparison of T[key] extends U. Setting B to true performs
 * a strict type comparison of T[key] extends U & U extends T[key]
 */
export type KeysOfType<T, U, B = false> = {
    [P in keyof T]: B extends true 
        ? T[P] extends U 
            ? (U extends T[P] 
                ? P 
                : never)
            : never
        : T[P] extends U 
            ? P 
            : never;
}[keyof T];

export type PickByType<T, U, B = false> = Pick<T, KeysOfType<T, U, B>>;


/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type nonPrimitiveObject<T> = T extends string | number | symbol | boolean | bigint | null ? undefined : T;

/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type nonPrimitiveNonArrayObject<T> = T extends Array<any> | string | number | symbol | boolean | bigint | null | Date ? undefined : T;

/**
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type excludePrimitiveProperties<T> = Omit<
    T,
    NonNullable<KeysOfType<
        { [key in keyof Required<T>]: nonPrimitiveNonArrayObject<Required<T>[key]> },
        never | undefined | null
    >>
>;




/**
 * Picks the properties of non-primitive properties of T (with dot notation)
 */
export type PickSubproperties_dotNotation<S> = {
    [K in keyof Required<excludePrimitiveProperties<S>>]: K extends string
        ? {
        [P in keyof Required<excludePrimitiveProperties<S>>[K]]: P extends string
            ? { [key in `${K}.${P}`]?: Required<excludePrimitiveProperties<S>>[K][P] }
            : never;
        }[keyof Required<excludePrimitiveProperties<S>>[K]]
        : never;
}[keyof Required<excludePrimitiveProperties<S>>];

/**
 * Picks the properties of non-primitive properties of T (with dot notation)
 */
export type PickSubproperties<S> = {
    [K in keyof Required<excludePrimitiveProperties<S>>]: K extends string
        ? {
        [P in keyof Required<excludePrimitiveProperties<S>>[K]]: P extends string
            ? { [key in P]?: Required<excludePrimitiveProperties<S>>[K][P] }
            : never;
        }[keyof Required<excludePrimitiveProperties<S>>[K]]
        : never;
}[keyof Required<excludePrimitiveProperties<S>>];

