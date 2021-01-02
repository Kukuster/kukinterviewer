/**
 * Returns a random element from the given array or a tuple (Type-safe)
 * @param arr an array or a tuple to get a random element from
 */
export default function randomElement<A extends readonly unknown[], T extends A[number]>(arr: readonly T[]){
    return arr[Math.floor(Math.random()*arr.length)];
}
