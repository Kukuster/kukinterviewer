import { Country, getAllCountries, getAllTimezones, getCountry, getTimezone } from "countries-and-timezones";
import { Timezone } from "node-schedule";
import { splitToWords } from "../matchTree/extras/splitToWords";



export type parseTimezone_result = {
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
};


export default function parseTimezone(input: string)
    : parseTimezone_result
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

    console.log({inputWords});
    //////////////////////////////////////////////////
    /////      try by literal timezone name      /////
    //////////////////////////////////////////////////
    for (let i = 0; i < inputWords_len; i++){
        const byLiteralTimezoneName = getTimezone(inputWords[i]);
        if (byLiteralTimezoneName){
            return {
                result: 'a single timezone',
                timezone: byLiteralTimezoneName.name,
                description: "found by literal timezone name",
            };
        }
    }


    const Countries = getAllCountries();

    //////////////////////////////////////////////////
    /////       try by literal country name      /////
    //////////////////////////////////////////////////
    /// if a country name equals to the whole input ///
    for (const id in Countries){
        if (Object.prototype.hasOwnProperty.call(Countries, id) && typeof Countries[id] === 'object'){
            
            // if found a country by name
            if (input.trim() === Countries[id].name){
                const country = Countries[id];

                if (country.timezones.length === 1){
                    return {
                        result: 'a single timezone',
                        timezone: country.timezones[0],
                        description: "found by literal country name (country name equals to the whole input)",
                    };
                } else {
                    return {
                        result: 'a country with a number of timezones',
                        timezones: country.timezones,
                        description: "found several by literal country name (country name equals to the whole input)",
                    };
                }

            }
        }
    } // for id in Contries
    /// if input contains a full country name ///
    for (const id in Countries) {
        if (Object.prototype.hasOwnProperty.call(Countries, id) && typeof Countries[id] === 'object') {

            // if found a country by name
            if (input.match(new RegExp(Countries[id].name, 'i'))) {
                const country = Countries[id];

                if (country.timezones.length === 1) {
                    return {
                        result: 'a single timezone',
                        timezone: country.timezones[0],
                        description: "found by literal country name (input contains the exact country name)",
                    };
                } else {
                    return {
                        result: 'a country with a number of timezones',
                        timezones: country.timezones,
                        description: "found several by literal country name (input contains the exact country name)",
                    };
                }

            }
        }
    } // for id in Contries
    /// if input contains all words from a full country name ///
    for (const id in Countries) {
        if (Object.prototype.hasOwnProperty.call(Countries, id) && typeof Countries[id] === 'object') {
            
            const countryWords = ( Countries[id].name.replace(/[/_-]/g, " ") ).split(' ');
            const countryWords_len = countryWords.length;

            // if a country name is made of several words (its not that many of them)
            if (countryWords && countryWords_len > 1) {
                let countryWordsMatched = 0;
                
                for (let i = 0; i < countryWords_len; i++){    
                    if (input.match(countryWords[i])){
                        countryWordsMatched++;
                    }
                }

                if (countryWordsMatched === countryWords_len){
                    return {
                        result: 'a country with a number of timezones',
                        timezones: Countries[id].timezones,
                        description: "found several by all literal words of a country name (input contains all words of a country name)",
                    };
                }

            }

        }
    } // for id in Contries

    
    //////////////////////////////////////////////////
    /////        try by literal country ID       /////
    //////////////////////////////////////////////////
    /// if input equals a literal country ID ///
    const byLiteralCountryId = getCountry(input.toUpperCase());
    if (byLiteralCountryId) {
        if (byLiteralCountryId.timezones.length === 1) {
            return {
                result: 'a single timezone',
                timezone: byLiteralCountryId.timezones[0],
                description: "found by literal country ID (an input word is a country ID)",
            };
        } else {
            return {
                result: 'a country with a number of timezones',
                timezones: byLiteralCountryId.timezones,
                description: "found several by literal country ID (an input word is a country ID)",
            };
        }
    }



    //////////////////////////////////////////////////
    /////       try by a timezone name word      /////
    //////////////////////////////////////////////////
    /// input contains a timezone name word ///
    const Timezones = getAllTimezones();
    const MatchedTimezones1: Timezone[] = [];
    const pushIfAbsent = <T>(arr: T[], el: T) => arr.find(v => v === el) ? null : arr.push(el);

    let timezoneWordsMatched = 0;

    for (const name in Timezones) {
        if (Object.prototype.hasOwnProperty.call(Timezones, name) && typeof Timezones[name] === 'object') {
            
            const timezoneWords = ( Timezones[name].name.replace(/[/_-]/g, " ") ).split(' ');
            const timezoneWords_len = timezoneWords.length;

            timezoneWordsMatched = 0;
            
            for (let i = 0; i < timezoneWords_len; i++) {
                for (let j = 0; j < inputWords_len; j++) {
                    if (inputWords[j].match(new RegExp('^'+timezoneWords[i]+'$', 'i'))) {
                        timezoneWordsMatched++;
                    }
                }
            }

            if (timezoneWordsMatched > 0){
                pushIfAbsent(MatchedTimezones1, name);
            }
            // if there's a full match (by separate words) of a timezone name, then choose that one right away
            if (timezoneWordsMatched === timezoneWords_len){
                return {
                    result: 'a single timezone',
                    timezone: name,
                    description: "found by all literal words of a timezone name (input contains all words of a timezone name)",
                };
            }

        }
    } // for id in Contries
    if        (MatchedTimezones1.length === 1) {
        return {
            result: 'a single timezone',
            timezone: MatchedTimezones1[0],
            description: "found by matching some timezone name words to some input words",
        };
    } else if (MatchedTimezones1.length  >  1) {
        return {
            result: 'a number of matching timezones',
            timezones: MatchedTimezones1,
            description: "found several by matching some timezone name words to some input words",
        };
    }




    //////////////////////////////////////////////////
    /////        try by literal country ID       /////
    //////////////////////////////////////////////////
    /// if an input word equals to a literal country ID ///
    for (let i = 0; i < inputWords_len; i++) {
        if (['im', 'am', 'is', 'to'].includes(inputWords[i])){
            continue;
        }
        const byLiteralCountryId = getCountry(inputWords[i].toUpperCase());
        if (byLiteralCountryId) {
            if (byLiteralCountryId.timezones.length === 1) {
                return {
                    result: 'a single timezone',
                    timezone: byLiteralCountryId.timezones[0],
                    description: "found by literal country ID (an input word is a country ID)",
                };
            } else {
                return {
                    result: 'a country with a number of timezones',
                    timezones: byLiteralCountryId.timezones,
                    description: "found several by literal country ID (an input word is a country ID)",
                };
            }
        }
    }




    //////////////////////////////////////////////////
    /////   try by word within a timezone name   /////
    //////////////////////////////////////////////////
    /// timezone name contains a word ///
    const notShortWords = inputWords.filter(w => w.length > 3);
    const notShortWords_len = notShortWords.length;

    const MatchedTimezones2: Timezone[] = [];

    for (const name in Timezones) {
        if (Object.prototype.hasOwnProperty.call(Timezones, name) && typeof Timezones[name] === 'object') {

            for (let i = 0; i < notShortWords_len; i++) {
                if (name.match(new RegExp(notShortWords[i], 'i'))){
                    pushIfAbsent(MatchedTimezones2, notShortWords[i]);
                }
            } // for i in notShortWords

        }
    } // for name in Timezones
    if        (MatchedTimezones2.length === 1) {
        return {
            result: 'a single timezone',
            timezone: MatchedTimezones2[0],
            description: "found by timezones names containing a word",
        };
    } else if (MatchedTimezones2.length  >  1) {
        return {
            result: 'a number of matching timezones',
            timezones: MatchedTimezones2,
            description: "found several by timezones names containing a word",
        };
    }


    
    
    return {
        result: "didn't figure anything out",
        description: "end of the parse_timezone function",
    };


}
