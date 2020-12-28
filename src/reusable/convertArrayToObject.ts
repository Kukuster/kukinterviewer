import { SubType } from "./Subtype.type";


export function convertArrayToObject<T extends { [prop in string | number]: any }, K extends keyof SubType<T, string | number> = keyof SubType<T, string | number>, A extends readonly T[] = readonly T[]> (array: readonly T[], key: K)
{
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue) as { [propkey in A[number][K]]: A[number]; };
}

