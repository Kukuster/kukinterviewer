/**
 * Exclude those object keys from Base which values extend Condition 
 */
export type SubType<Base, Condition> = Pick<Base, {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base]>;


export type RequiredLiteralKeys<T> = { [K in keyof T]-?:
    string extends K ? never : number extends K ? never : {} extends Pick<T, K> ? never : K
} extends { [_ in keyof T]-?: infer U } ? U extends keyof T ? U : never : never;

export type OptionalLiteralKeys<T> = { [K in keyof T]-?:
    string extends K ? never : number extends K ? never : {} extends Pick<T, K> ? K : never
} extends { [_ in keyof T]-?: infer U } ? U extends keyof T ? U : never : never;

export type IndexKeys<T> = string extends keyof T ? string : number extends keyof T ? number : never;



export type PickOptionalLiteralKeys<T> = Pick<T, OptionalLiteralKeys<T>>

export type PickRequiredLiteralKeys<T> = Pick<T, RequiredLiteralKeys<T>>

export type PickIndexKeys<T> = Pick<T, IndexKeys<T>>


