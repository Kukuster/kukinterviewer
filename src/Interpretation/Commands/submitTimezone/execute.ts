import { Country } from "countries-and-timezones";
import { unemojify } from "node-emoji";
import { IIMessage } from "../../../bot/botlib";
import askConfirmation from "../../../core/sheet/methods/functions/askConfirmation";
import askForTimezone from "../../../core/sheet/methods/parsed_timezones/askForTimezone";
import getAwaitingParsedTimezones from "../../../core/sheet/methods/parsed_timezones/getAwaitingParsedTimezones";
import { Ichat } from "../../../core/sheet/models/ChatModel";
import parseTimezone, { parseTimezone_result } from "../../textProcessing/parseTimezone";



export type submitTimezone_execute_return = {
    request: string,
    result: parseTimezone_result,
    response: Ichat | null,
    timezone?: string,
    timezones?: string[],
    country?: Country,
    country_name?: string,
    countries?: Country[],
};

export const parsingFailed = (result: parseTimezone_result) => !result || result.result === "didn't figure anything out";


export default async function submitTimezone_execute(msg: IIMessage, message: string)
    : Promise<submitTimezone_execute_return | null>
{
    console.log('submitTimezone.execute');

    const chatId = msg.chat.id;

    const preparsed_timezones = await getAwaitingParsedTimezones(chatId);

    let parseTimezones_result: parseTimezone_result;

    if (preparsed_timezones && (
        preparsed_timezones.timezones ||
        preparsed_timezones.country   ||
        preparsed_timezones.countries
    )){
        parseTimezones_result = parseTimezone(message, preparsed_timezones);
        if (parsingFailed(parseTimezones_result))
            parseTimezones_result = parseTimezone(unemojify(message).replace(/[:-]/g, " "), preparsed_timezones);

        if (parsingFailed(parseTimezones_result))
            parseTimezones_result = parseTimezone(message);

        if (parsingFailed(parseTimezones_result))
            parseTimezones_result = parseTimezone(unemojify(message).replace(/[:-]/g, " "));


    } else {
        parseTimezones_result = parseTimezone(message);

        if (parsingFailed(parseTimezones_result))
            parseTimezones_result = parseTimezone(unemojify(message).replace(/[:-]/g, " "));
    }


    if (parsingFailed(parseTimezones_result)) {
        return {
            request: message,
            result: parseTimezones_result,
            response: null,
        };
    } else if (parseTimezones_result.result === 'a single timezone') {
        return {
            request: message,
            result: parseTimezones_result,
            // response: await finishSettingTimezone(chatId, parseTimezones_result.timezone),
            response: await askConfirmation(chatId, 'finishSettingTimezone', JSON.stringify(parseTimezones_result.timezone)),
            timezone: parseTimezones_result.timezone,
        };
    } else if (parseTimezones_result.result === 'a number of countries') {
        return {
            request: message,
            result: parseTimezones_result,
            response: await askForTimezone(chatId, {
                countries: parseTimezones_result.countries.map(C => C.id),
            }),
            countries: parseTimezones_result.countries,
        };
    } else if (parseTimezones_result.result === 'a country with a number of timezones') {
        return {
            request: message,
            result: parseTimezones_result,
            response: await askForTimezone(chatId, {
                country: parseTimezones_result.country.id,
            }),
            country: parseTimezones_result.country,
        };
    } else if (parseTimezones_result.result === 'a number of matching timezones within a country') {
        return {
            request: message,
            result: parseTimezones_result,
            response: await askForTimezone(chatId, {
                timezones: parseTimezones_result.timezones,
            }),
            country_name: parseTimezones_result.country_name,
            timezones: parseTimezones_result.timezones,
        };
        
    } else if (parseTimezones_result.result === 'a number of matching timezones') {
        return {
            request: message,
            result: parseTimezones_result,
            response: await askForTimezone(chatId, {
                timezones: parseTimezones_result.timezones,
            }),
            timezones: parseTimezones_result.timezones,
        };

    } else {
        // should never happen
        return null;
    }
    

}
