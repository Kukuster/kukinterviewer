import { IIMessage } from "../../../core/Command/Command";
import setChatProperty from "../../../core/sheet/methods/chat/setChatProperty";
import setSettings from "../../../core/sheet/methods/chat/setSettings";
import askForTimezone from "../../../core/sheet/methods/parsed_timezones/askForTimezone";
import finishSettingTimezone from "../../../core/sheet/methods/parsed_timezones/finishSettingTimezone";
import getAwaitingParsedTimezones from "../../../core/sheet/methods/parsed_timezones/getAwaitingParsedTimezones";
import parseTimezone, { parseTimezone_result } from "../../textProcessing/parseTimezone";

export default async function submitTimezone_execute(msg: IIMessage, message: string)
    // : Promise<>
{

    const chatId = msg.chat.id;

    const preparsed_timezones = await getAwaitingParsedTimezones(chatId);

    let parseTimezones_result: parseTimezone_result;

    if (preparsed_timezones && (
        preparsed_timezones.timezones ||
        preparsed_timezones.country   ||
        preparsed_timezones.countries
    )){
        parseTimezones_result = parseTimezone(message, preparsed_timezones);
        if (!parseTimezones_result || parseTimezones_result.result === "didn't figure anything out"){
            parseTimezones_result = parseTimezone(message);
        }
    } else {
        parseTimezones_result = parseTimezone(message);
    }


    if        (parseTimezones_result.result === "didn't figure anything out") {
        return {
            request: message,
            response: null,
        };
    } else if (parseTimezones_result.result === 'a single timezone') {
        await setChatProperty(chatId, {$set: {'state': 'ready'}});
        await finishSettingTimezone(chatId);
        return {
            request: message,
            response: await setSettings(chatId, { setting: 'timezone', value: parseTimezones_result.timezone }),
            timezone: parseTimezones_result.timezone,
        };
    } else if (parseTimezones_result.result === 'a number of countries') {
        return {
            request: message,
            response: await askForTimezone(chatId, {
                countries: parseTimezones_result.countries.map(C => C.id),
            }),
            countries: parseTimezones_result.countries,
        };
    } else if (parseTimezones_result.result === 'a country with a number of timezones') {
        return {
            request: message,
            response: await askForTimezone(chatId, {
                country: parseTimezones_result.country.id,
            }),
            country: parseTimezones_result.country,
        };
    } else if (
        parseTimezones_result.result === 'a number of matching timezones within a country' ||
        parseTimezones_result.result === 'a number of matching timezones'
    )
    {
        return {
            request: message,
            response: await askForTimezone(chatId, {
                timezones: parseTimezones_result.timezones,
            }),
            timezones: parseTimezones_result.timezones,
        };
    }
    

}
