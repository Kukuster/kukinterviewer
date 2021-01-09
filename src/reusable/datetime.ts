export function getDateWithoutTime(dateTime: Date): Date;
export function getDateWithoutTime(dateTime_str: string):  Date;
export function getDateWithoutTime(dateTime_unix: number): number;
export function getDateWithoutTime(dateTime: null): null;

export function getDateWithoutTime(dateTime: Date | number | string | null) {
    if (typeof dateTime === 'number' || dateTime instanceof Number) {
        return new Date(dateTime).setHours(0, 0, 0, 0);
    } else if (typeof dateTime === 'string' || dateTime instanceof String) {
        return new Date(new Date(dateTime).setHours(0, 0, 0, 0));
    } else if (isDate(dateTime)) {
        return new Date(new Date(dateTime.getTime()).setHours(0, 0, 0, 0));
    } else {
        return null;
    }
}



export function getTimeWithoutDate(dateTime: Date): number;
export function getTimeWithoutDate(dateTime_str: string): number;
export function getTimeWithoutDate(dateTime_unix: number): number;
export function getTimeWithoutDate(dateTime: null): null;

export function getTimeWithoutDate(dateTime: Date | number | string | null) {

    if (typeof dateTime === 'number' || dateTime instanceof Number) {
        const dateObj = new Date(dateTime);
        return dateObj.getTime() - getDateWithoutTime(dateObj).getTime();

    } else if (typeof dateTime === 'string' || dateTime instanceof String) {
        let dateObj = new Date(dateTime);
        if (!isValidDate(dateObj)) {
            dateObj = getTimeFromString(dateTime as string);
        }
        if (!isValidDate(dateObj)) {
            return null;
        }
        return dateObj.getTime() - getDateWithoutTime(dateObj).getTime();

    } else if (isDate(dateTime)) {
        return dateTime.getTime() - getDateWithoutTime(dateTime).getTime();

    } else {
        return null;

    }
}



export function getTimeFromString(timeString: string): Date {
    return new Date('1970-01-01T' + timeString + 'Z');
}


export function isValidDate(d: Date): boolean;
export function isValidDate(d: unknown): boolean {
    return isDate(d) && !isNaN(d.getTime());
}

export function isDate(d: unknown): d is Date {
    return Object.prototype.toString.call(d) === "[object Date]";
}


export const timeUnitsVocabulary = {
    'seconds':  1000,
    'minutes': 60000,
    'hours': 3600000,
    'days': 86400000,
} as const;
export type timeUnitsVocabulary = keyof typeof timeUnitsVocabulary;


/**
 * @param dateMinuend Date to subtract from
 * @param dateSubtrahend Date to sbustract
 * @param precision the result will be rounded to the nearest multiple of this number (in miliseconds)
 * @returns the difference between `dateMinuend` and `dateSubtrahend` (rounded by `precision`)
 */
export function getTimeDifference(dateMinuend: Date, dateSubtrahend: Date, precision_ms: number): number
export function getTimeDifference(dateMinuend: Date, dateSubtrahend: Date, precision: timeUnitsVocabulary): number
export function getTimeDifference(dateMinuend: Date, dateSubtrahend: Date, precision: number | timeUnitsVocabulary = 1) {
    if (typeof precision === 'string') {
        precision = timeUnitsVocabulary[precision];
    }
    return Math.round((dateMinuend.getTime() - dateSubtrahend.getTime())/precision) * precision;
}



export function getCurrentTime() {
    return getTimeWithoutDate(new Date());
}

export function getCurrentDate() {
    return getDateWithoutTime(new Date());
}




