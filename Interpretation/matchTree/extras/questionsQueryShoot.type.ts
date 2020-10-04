/**
 * A tree has shoots of this type, hence Command.prepare forms questionsQuery type
 */
export type questionsQueryShoot = {
    qids?: 'some',
    enabled?: boolean,
    Tags?: 'some' | 'no' | 'any',
} | 'all';
