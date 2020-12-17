/**
 * - When 1 argument it's identical to Partial<T>
 * - with the 2nd argument, you can specify the type of keys in the 1st to make partial
 */
export type PartialProperties<T, K extends keyof T = keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;
