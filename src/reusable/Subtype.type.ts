/**
 * Exclude those object keys from Base which values extend Condition 
 */
export type SubType<Base, Condition> = Pick<Base, {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base]>;
