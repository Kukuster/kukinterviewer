/**
 * A tree has shoots of this type, hence Command.prepare forms tagsQuery type
 */
export type tagsQueryShoot = {
    qids?: 'some',
    tagStrParts?: string[],
    enabled?: boolean,
} | 'all';
