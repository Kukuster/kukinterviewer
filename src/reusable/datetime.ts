import { DateTime, DateTimeFormatOptions, LocaleOptions } from "luxon";
import round from "./round";

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
    return DateTime.fromISO(date.toISOString()).setZone(tzString, { keepLocalTime: true }).toJSDate();
}

export function convertTimeOfDayFromTZ(timeOfDay: Date | number, tzString: string) {
    const rightNow = new Date();
    const today = getDateWithoutTime(rightNow);
    const givenTimeOfDay_unix = getTimeWithoutDate(timeOfDay);
    const todayTime_datetime_unix = today.getTime() + givenTimeOfDay_unix;

    const converted_datetime = DateTime.fromISO((new Date(todayTime_datetime_unix)).toISOString()).setZone(tzString, { keepLocalTime: true }).toJSDate();

    const converted_time_normalized = normalizeTimeOfDay(getTimeWithoutDate(converted_datetime));
    return converted_time_normalized;
}


export function normalizeTimeOfDay(datetime: number){
    return mod(datetime, timeUnitsVocabulary.days);
}


/**
 * Consistently correctly working mathematical module function (works normal when the divisor is negative)
 */
export function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}


/**
 * Forms a human readable string representation of the given timezone in terms of offset
 * @param tzString client's timezone string
 */
export function getTimezoneOffsetString(tzString: string){
    const fullOffset_inMins = DateTime.fromJSDate(new Date()).setZone(tzString).offset;
    const fullOffset_inHrs  = fullOffset_inMins / 60;
    const offsetHrs_inMins = round(fullOffset_inMins, 60, "down");
    const offsetHrs_inHrs = offsetHrs_inMins / 60;
    const offsetMins_inMins = fullOffset_inMins - offsetHrs_inMins;

    const offset_sign = fullOffset_inMins < 0 ? '-' : '+';
    const prefixZero = Math.abs(offsetHrs_inHrs) < 10 ? '0' : '';
    
    const minsStr = offsetMins_inMins === 0 ? '00' : offsetMins_inMins;

    const offsetStr = `GMT${offset_sign}${prefixZero}${Math.abs(offsetHrs_inHrs)}:${minsStr}`;
    return offsetStr;
}


/**
 * Forms a human readable string representation of the given time of day relevant to the current datetime
 * @param unix unix timestamp representing a datetime
 * @param tzString client's timezone string
 * @param now current datatime (needed for correct timezone convertion)
 */
export function datetime_toRelevantString(unix: number, tzString?: string, now?: number | Date) {
    if (!now){
        now = new Date();
    } else if (typeof now === 'number'){
        now = new Date(now);
    }
    const currentDate = DateTime.fromJSDate(now);


    let options: LocaleOptions & DateTimeFormatOptions;

    const date = tzString ? DateTime.fromJSDate(new Date(unix)).setZone(tzString) : DateTime.fromJSDate(new Date(unix));


    if (date.year !== currentDate.year){
        // if different year, include all the datetime info up to a year
        options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
        };
    } else {
        if (date.month !== currentDate.month){
            // different month
            options = {
                month: 'short',
                weekday: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
            };
        } else {
            if (date.day !== currentDate.day){
                // different day
                if (Math.abs(date.day - currentDate.day) > 6){
                    // different week
                    options = {
                        month: 'short',
                        weekday: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZoneName: 'short',
                    };
                } else {
                    // same week, different day
                    options = {
                        weekday: 'short',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZoneName: 'short',
                    };
                }
            } else {
                // same day
                options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short',
                };
            }
        }
    }


    return date.toLocaleString(options);
}


/**
 * Forms a human readable string representation of the given time of day
 * @param unix unix timestamp representing timeOfDay (usually, a whole number between 0 and 1000*60*60*24)
 * @param tzString client's timezone string
 * @param now current datatime (needed for correct timezone convertion)
 */
export function timeOfDay_toString(unix: number, tzString?: string, now?: number | Date) {
    unix = normalizeTimeOfDay(unix);
    if (!now) {
        now = new Date();
    } else if (typeof now === 'number') {
        now = new Date(now);
    }
    const currentDate = DateTime.fromJSDate(now);
    const today = getDateWithoutTime(now).getTime();


    const date = tzString ? DateTime.fromJSDate(new Date(unix + today)).setZone(tzString) : DateTime.fromJSDate(new Date(unix));

    const options: LocaleOptions & DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    return date.toLocaleString(options);

}

