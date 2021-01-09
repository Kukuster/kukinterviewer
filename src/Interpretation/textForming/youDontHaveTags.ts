import either from "../../reusable/randomElement";

export const youDontHaveTags_variants = [
    `You don't have any tags at all!`,
    `There are no tags in your list`,
    `There are 0 tags in your list`,
] as const;

export default function youDontHaveTags(seed?: number){
    if (typeof seed === 'number'){
        return youDontHaveTags_variants[seed];
    } else {
        return either(youDontHaveTags_variants);
    }
}
