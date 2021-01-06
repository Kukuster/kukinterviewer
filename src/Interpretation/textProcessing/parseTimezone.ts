import { Timezone as Timezone_obj, Country, getAllCountries as getAllCountries_original, getAllTimezones as getAllTimezones_original, getCountry as getCountry_original, getTimezone as getTimezone_original } from "countries-and-timezones";
import { unemojify } from "node-emoji";
import { Timezone as Timezone_str } from "node-schedule";
import { uniquifyArray } from "../../core/misc";
import { convertArrayToObject } from "../../reusable/convertArrayToObject";
import excludeFromTypedArray from "../../reusable/excludeFromTypedArray";
import { escapeRegExp } from "../../reusable/RegExp";
import { splitToWords } from "../matchTree/extras/splitToWords";



export type parseTimezone_result = {
    result: 'a single timezone',
    timezone: Timezone_str,
    description?: string,
} | {
    result: 'a country with a number of timezones',
    country: Country,
    description?: string,
} | {
    result: 'a number of matching timezones within a country',
    country_name: string,
    timezones: Timezone_str[],
    description?: string,
} | {
    result: 'a number of matching timezones',
    timezones: Timezone_str[],
    description?: string,
} | {
    result: 'a number of countries',
    countries: Country[],
    description?: string,
} | {
    result: "didn't figure anything out",
    description?: string,
};


export default function parseTimezone(input: string, preparsed?: {
    timezones?: string[],
    country?:   string,
    countries?: string[],
} | null)
    : parseTimezone_result
{

    let getAllCountries: () => { [id: string]: Country };
    let getAllTimezones: () => { [name: string]: Timezone_obj };
    let getCountry:      (id: string) => Country | null;
    let getTimezone:     (name: string) => Timezone_obj | null;

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //// if there is some preparsed data from the DB
    //// then substitute the functions from "countries-and-timezones" which search through their DB
    //// to the functions that search only within the preparsed data
    /////////////////////////////////////////////////////////////////////////////////////////////////
    if (preparsed){
        const countries = preparsed.countries;
        const timezones = preparsed.timezones;
        const country   = preparsed.country;

        if (timezones) {
            getAllCountries = () => ({});
            getCountry = () => null;

            const theTimezones_andNulls = timezones.map(tz => getTimezone_original(tz));
            const theTimezones = excludeFromTypedArray(theTimezones_andNulls, [null]);
            getAllTimezones = () => convertArrayToObject(theTimezones, 'name');
            getTimezone = (name: string) => ( getAllTimezones() )[name] || null;

        } else if (country) {
            const preparsedCountry = getCountry_original(country);
            if (preparsedCountry){
                getAllCountries = () => {
                    const ret: { [propkey in Country["id"]]: Country; } = {};
                    if (preparsedCountry) {
                        ret[preparsedCountry.id] = preparsedCountry;
                    }
                    return ret;
                };
                getCountry = (id: string) => id === preparsedCountry.id ? preparsedCountry : null;

                const theTimezones_andNulls = preparsedCountry.timezones.map(tzs => getTimezone_original(tzs));
                const theTimezones = excludeFromTypedArray(theTimezones_andNulls, [null]);

                getAllTimezones = () => convertArrayToObject(theTimezones, 'name');
                getTimezone = (name: string) => ( getAllTimezones() )[name] || null;
            } else {
                getAllCountries = () => ({});
                getCountry = () => null;
                getAllTimezones = () => ({});
                getTimezone = () => null;
            }

        } else if (countries) {
            const theCountries_andNulls = countries.map(C => getCountry_original(C));
            const theCountries = excludeFromTypedArray(theCountries_andNulls, [null]);
            
            getAllCountries = () => convertArrayToObject(theCountries, 'id');
            getCountry = (id: string) => ( getAllCountries() )[id] || null;

            const theTimezoneStrings = uniquifyArray( ([] as string[]).concat(...theCountries.map(obj => obj.timezones)) );
            const theTimezones_andNulls = theTimezoneStrings.map(tzs => getTimezone_original(tzs));
            const theTimezones = excludeFromTypedArray(theTimezones_andNulls, [null]);

            getAllTimezones = () => convertArrayToObject(theTimezones, 'name');
            getTimezone = (name: string) => (getAllTimezones())[name] || null;

        } else {
            getAllCountries = () => ({});
            getCountry = () => null;
            getAllTimezones = () => ({});
            getTimezone = () => null;
        }
        

    } else {
        getAllCountries = getAllCountries_original;
        getCountry      = getCountry_original;
        getAllTimezones = getAllTimezones_original;
        getTimezone     = getTimezone_original;
    }



    const inputWordsAndSpaces = splitToWords(unemojify(input));
    const inputWords = inputWordsAndSpaces ? inputWordsAndSpaces.filter(w => !w.match(/^\s+$/g)) : null;

    //////////////////////////////////////////////////
    /////     Fail if no words in the message    /////
    //////////////////////////////////////////////////
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
                        country: country,
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
            if (input.match(new RegExp(escapeRegExp(Countries[id].name), 'i'))) {
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
                        country: country,
                        description: "found several by literal country name (input contains the exact country name)",
                    };
                }

            }
        }
    } // for id in Contries
    /// if input contains all words from a full country name ///
    for (const id in Countries) {
        if (Object.prototype.hasOwnProperty.call(Countries, id) && typeof Countries[id] === 'object') {
            
            const countryWords = ( Countries[id].name.replace(/[:/_-]/g, " ") ).split(' ');
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
                    if (Countries[id].timezones.length === 1) {
                        return {
                            result: 'a single timezone',
                            timezone: Countries[id].timezones[0],
                            description: "found by all literal words of a country name (input contains all words of a country name)",
                        };
                    } else {
                        return {
                            result: 'a country with a number of timezones',
                            country: Countries[id],
                            description: "found several by all literal words of a country name (input contains all words of a country name)",
                        };
                    }
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
                country: byLiteralCountryId,
                description: "found several by literal country ID (an input word is a country ID)",
            };
        }
    }



    //////////////////////////////////////////////////
    /////       try by a timezone name word      /////
    //////////////////////////////////////////////////
    /// input contains a timezone name word ///
    const Timezones = getAllTimezones();
    const MatchedTimezones1: Timezone_str[] = [];
    const pushIfAbsent = <T>(arr: T[], el: T) => arr.find(v => v === el) ? null : arr.push(el);

    let timezoneWordsMatched = 0;

    for (const name in Timezones) {
        if (Object.prototype.hasOwnProperty.call(Timezones, name) && typeof Timezones[name] === 'object') {
            
            const timezoneWords = ( Timezones[name].name.replace(/[:/_-]/g, " ") ).split(' ');
            const timezoneWords_len = timezoneWords.length;

            timezoneWordsMatched = 0;
            
            for (let i = 0; i < timezoneWords_len; i++) {
                for (let j = 0; j < inputWords_len; j++) {
                    if (inputWords[j].match(new RegExp('^' +escapeRegExp(timezoneWords[i])+'$', 'i'))) {
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
                    country: byLiteralCountryId,
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

    const MatchedTimezones2: Timezone_str[] = [];

    for (const name in Timezones) {
        if (Object.prototype.hasOwnProperty.call(Timezones, name) && typeof Timezones[name] === 'object') {

            for (let i = 0; i < notShortWords_len; i++) {
                if (name.match(new RegExp(escapeRegExp(notShortWords[i]), 'i'))){
                    pushIfAbsent(MatchedTimezones2, name);
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
