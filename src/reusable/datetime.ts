import { DateTime } from "luxon";

export function getDateWithoutTime(dateTime: Date): Date;
export function getDateWithoutTime(dateTime_str: string):  Date;
export function getDateWithoutTime(dateTime_unix: number): number;
export function getDateWithoutTime(dateTime: Date | string): Date
export function getDateWithoutTime(dateTime: Date | number | string): Date | number;
export function getDateWithoutTime(dateTime?: null): Date;

export function getDateWithoutTime(dateTime?: Date | number | string | null) {
    if (typeof dateTime === 'number') {
        return new Date(dateTime).setHours(0, 0, 0, 0);
    } else if (typeof dateTime === 'string') {
        return new Date(new Date(dateTime).setHours(0, 0, 0, 0));
    } else if (isDate(dateTime)) {
        return new Date(new Date(dateTime.getTime()).setHours(0, 0, 0, 0));
    } else {
        return new Date(new Date().setHours(0, 0, 0, 0));
    }
}



export function getTimeWithoutDate(dateTime: Date): number;
export function getTimeWithoutDate(dateTime_str: string): number;
export function getTimeWithoutDate(dateTime_unix: number): number;
export function getTimeWithoutDate(dateTime: Date | number | string): number;
export function getTimeWithoutDate(dateTime?: null): number;
export function getTimeWithoutDate(dateTime?: Date | number | string | null) {

    if (typeof dateTime === 'number') {
        const dateObj = new Date(dateTime);
        return dateObj.getTime() - getDateWithoutTime(dateObj).getTime();

    } else if (typeof dateTime === 'string') {
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
        const dateObj = new Date();
        return dateObj.getTime() - getDateWithoutTime(dateObj).getTime();

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


export function getNextDay(date: Date): Date | null;
export function getNextDay(date: number): number;
export function getNextDay(date: Date | number): Date | number | null;
export function getNextDay(date: Date | number){
    if (typeof date === 'number'){
        const nextDay = new Date(date); nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.getTime();
    } else if (isValidDate(date)) {
        const nextDay = new Date(date); nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
    } else {
        return null;
    }
    
}



export function verboseDatetime(datetime: Date | number){
    if (typeof datetime === 'number'){
        datetime = new Date(datetime);
    }
    return `${datetime.toDateString()} ${datetime.toTimeString()}`;
}




export function convertTZ(date: Date, tzString: string) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

export function convertFromTZ(date: Date, tzString: string) {
    return DateTime.fromISO(date.toISOString()).setZone(tzString, {keepLocalTime: true}).toJSDate();
}



