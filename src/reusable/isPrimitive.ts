export function isPrimitive(value: unknown): value is string | number | bigint | boolean | undefined | symbol | null {
    return (typeof value !== 'object' && typeof value !== 'function') || value === null;
}

export function isNotPrimitive(value: unknown): value is { [key in string | number]: any } {
    return !isPrimitive(value);
}

