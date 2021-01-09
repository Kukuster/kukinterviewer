export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = {
    [K in Keys]-?:
        Required<Pick<T, K>>
        & Pick<T, Exclude<keyof T, Keys>> & Partial<Pick<T, Keys>>
}[Keys];
