import { Country } from "countries-and-timezones";
import { Timezone } from "node-schedule";
import { splitToWords } from "../matchTree/extras/splitToWords";

export default function parseTimezone_againstArray(input: string, Array: string[])
    : {
        result: 'a single timezone',
        timezone: Timezone,
        description?: string,
    } | {
        result: 'a country with a number of timezones',
        timezones: readonly string[],
        description?: string,
    } | {
        result: 'a number of matching timezones within a country',
        timezones: Timezone[],
        description?: string,
    } | {
        result: 'a number of matching timezones',
        timezones: Timezone[],
        description?: string,
    } | {
        result: 'a number of countries',
        countries: Country[],
        description?: string,
    } | {
        result: "didn't figure anything out",
        description?: string,
    }
{

    const inputWordsAndSpaces = splitToWords(input);
    const inputWords = inputWordsAndSpaces!.filter(w => !w.match(/^\s+$/g));

    if (!inputWords || inputWords.length === 0) {
        return {
            result: "didn't figure anything out",
            description: "filtered strWords is empty"
        };
    }

    const inputWords_len = inputWords.length;


    //////////////////////////////////////////////////
    /////      try by literal timezone name      /////
    //////////////////////////////////////////////////
    for (let i = 0; i < inputWords_len; i++){
        const byLiteralTimezoneName = Array.find(tz => tz === input);

        if (byLiteralTimezoneName){
            return {
                result: 'a single timezone',
                timezone: byLiteralTimezoneName,
                description: "found by literal timezone name",
            };
        }
    }



    //////////////////////////////////////////////////
    /////       try by a timezone name word      /////
    //////////////////////////////////////////////////
    /// input contains a timezone name word ///
    const MatchedTimezones: Timezone[] = [];
    const Array_len = Array.length;
    const pushIfAbsent = <T>(arr: T[], el: T) => arr.find(v => v === el) ? null : arr.push(el);
    
    let timezoneWordsMatched = 0;
    
    for (let i = 0; i < Array_len; i++){
        
        const timezoneWords = ( Array[i].replace(/[/_-]/g, " ") ).split(' ');
        const timezoneWords_len = timezoneWords.length;

        timezoneWordsMatched = 0;
        
        for (let i = 0; i < timezoneWords_len; i++) {
            for (let j = 0; j < inputWords_len; j++) {
                if (inputWords[j].match(new RegExp('^'+timezoneWords[i], 'i'))) {
                    timezoneWordsMatched++;
                }
            }
        }

        if (timezoneWordsMatched > 0){
            pushIfAbsent(MatchedTimezones, Array[i]);
        }
        // if there's a full match (by separate words) of a timezone name, then choose that one right away
        if (timezoneWordsMatched === timezoneWords_len){
            return {
                result: 'a single timezone',
                timezone: Array[i],
                description: "found by all literal words of a timezone name (input contains all words of a timezone name)",
            };
        }

    } // for i in Array
    if        (MatchedTimezones.length === 1) {
        return {
            result: 'a single timezone',
            timezone: MatchedTimezones[0],
            description: "found by matching some timezone name words to some input words",
        };
    } else if (MatchedTimezones.length  >  1) {
        return {
            result: 'a number of matching timezones',
            timezones: MatchedTimezones,
            description: "found several by matching some timezone name words to some input words",
        };
    }











    return {
        result: "didn't figure anything out",
        description: "end of the parse_timezone function",
    };


}
