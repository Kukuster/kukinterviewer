import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { submitTimezone_execute_return } from "./execute";
import { getTimezoneOffsetString } from "../../../reusable/datetime";


export default async function submitTimezone_display(msg: IIMessage, data: submitTimezone_execute_return | null)
    : Promise<maybeTelegramBotMessage[] | null>
{
    console.log('submitTimezone.display');
    
    const chatId = msg.chat.id;

    if (!data) {
        // should never happen        
        return null;
    }

    
    if (data.result.result === 'a single timezone') {
        const reply = `Got it.
Going to sign up your timezone as <b>${data.result.timezone}</b> (${getTimezoneOffsetString(data.result.timezone)}), OK?

This is going to be it with the set up, and I'll be able to write down your questions and start asking you when you want`;

        return sendMessageSafely(chatId, reply, {
            parse_mode: "HTML",
        });


    } else if (data.result.result === 'a number of matching timezones') {
        const timezones_len = data.result.timezones.length;
        let reply = ``;

        if (timezones_len >= 10){
            reply += `There are a lot of timezones like that. Which one?\n\n`;
        } else {
            reply += `I guess it should be either one of those:\n\n`;
        }

        for (let i = 0; i < timezones_len; i++){
            reply += `    ${data.result.timezones[i]}\n`;
        }

        return sendMessageSafely(chatId, reply, {
            parse_mode: "HTML",
        });


    } else if (data.result.result === 'a number of matching timezones within a country') {
        const timezones_len = data.result.timezones.length;
        let reply = ``;

        if (timezones_len >= 6) {
            reply += `There are a lot of timezones in ${data.result.country_name} like that. Which one?\n\n`;
        } else {
            reply += `There are several timezones in ${data.result.country_name} like that:\n\n`;
        }

        for (let i = 0; i < timezones_len; i++) {
            reply += `    ${data.result.timezones[i]}\n`;
        }

        return sendMessageSafely(chatId, reply, {
            parse_mode: "HTML",
        });


    } else if (data.result.result === 'a country with a number of timezones') {
        const timezones_len = data.result.country.timezones.length;
        let reply = ``;

        if (timezones_len >= 5) {
            reply += `So you are in ${data.result.country.name}? Big country. Which timezone is closer to you?\n\n`;
        } else {
            reply += `So you are in ${data.result.country.name}? Which timezone is closer to you?\n\n`;
        }

        for (let i = 0; i < timezones_len; i++) {
            reply += `    ${data.result.country.timezones[i]}\n`;
        }

        return sendMessageSafely(chatId, reply, {
            parse_mode: "HTML",
        });


    } else if (data.result.result === 'a number of countries') {
        const countries_len = data.result.countries.length;
        let reply = ``;

        if (countries_len >= 5) {
            reply += `Let me guess. Is any of those countries is what you are looking for?\n\n`;
        } else {
            reply += `I'm guessing a few countries. Which one?\n\n`;
        }

        for (let i = 0; i < countries_len; i++) {
            reply += `    ${data.result.countries[i].name}\n`;
        }

        return sendMessageSafely(chatId, reply, {
            parse_mode: "HTML",
        });


    } else if (data.result.result === "didn't figure anything out") {
        // keep silent if didn't match anything
        return null;


    } else {
        // should never happen
        return null;


    }

}
