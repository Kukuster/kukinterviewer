import either from "../../reusable/randomElement";

export const youDontHaveQuestions_variants = [
    `You don't have any questions at all!`,
    `There are no questions in your list`,
    `There are 0 questions in your list`,
] as const;

export default function youDontHaveQuestions(seed?: number){
    if (typeof seed === 'number'){
        return youDontHaveQuestions_variants[seed];
    } else {
        return either(youDontHaveQuestions_variants);
    }
}
