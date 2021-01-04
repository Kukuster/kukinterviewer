import { IIMessage } from "../../../core/Command/Command";
import { sendMessageSafely } from "../../../bot";
import { maybeTelegramBotMessage } from "../../../botlib";
import { setAskingTime_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import { datetime_toRelevantString, timeOfDay_toString } from "../../../reusable/datetime";
import prettyMilliseconds from 'pretty-ms';


export default async function setAskingTime_display(msg: IIMessage, data: setAskingTime_execute_return | null)
    : Promise<maybeTelegramBotMessage[] | null>
{

    const chatId = msg.chat.id;

    if (!data){
        return null;
    }

    const messageParts: string[] = [];


    let askingTime_str = '';
    let askingInterval_str = '';
    let askingTimeWindow_str = '';
    let next_unix_str = '';

    let settingAskingRegularity_respond: boolean = false;
    let settingNextQuestionTime_repond: boolean = false;


    //////////////////////////////////////////
    ////         asking regularity        ////
    //////////////////////////////////////////
    // if any of the three (askingTimeOfDay_from, askingTimeOfDay_to, and asking interval) are to be set
    if ((data.request.from     && typeof data.response.from        === 'number') ||
        (data.request.to       && typeof data.response.to          === 'number') ||
        (data.request.interval && typeof data.response.interval_ms === 'number')){

        settingAskingRegularity_respond = true;

        if ((data.request.from     && typeof data.response.from        === 'number') &&
            (data.request.to       && typeof data.response.to          === 'number')){

            askingTime_str += either([
                `${either(['Will', 'Ok, I will'])} be asking you ${either(['questions', ''])} `,
                `${either(['Going', `Ok, going`, `Ok, I'm going`])} to ask you${either([' questions'])} `,
            ]);
            askingTimeWindow_str += either([
                `${either(['starting at','starting from','from'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} ${either(['and to','up to','until','and finishing at'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,

                // not using the following line, because it's not impelemented yet as a NL request in a matchTrees
                // `between ${timeOfDay_toString(data.response.from, data.response.timezone)} and ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
            ]);

        } else if (data.request.from && typeof data.response.from === 'number'){
            askingTimeWindow_str += either([
                `Ok, starting asking you ${either(['at','from'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
                `Ok, will start asking you ${either(['at','from'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
                `Ok, will start asking you ${either(['at','from'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
                `Ok, I won't be asking you${either([' questions'])} ${either(['until'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
                `Ok, I won't ask you any questions ${either(['until'])} ${timeOfDay_toString(data.response.from, data.response.timezone)} `,
            ]);

        } else if (data.request.to   && typeof data.response.to   === 'number'){
            askingTimeWindow_str += either([
                `Ok, will stop asking you ${either(['at'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,
                `Ok, will finish asking you ${either(['at'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,
                `Ok, stopping asking you ${either(['at'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,
                `Ok, I won't be asking you${either([' questions'])} ${either(['after'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,
                `Ok, I won't ask you any questions ${either(['after'])} ${timeOfDay_toString(data.response.to, data.response.timezone)} `,
            ]);

        }

        if (data.request.interval && typeof data.response.interval_ms === 'number'){
            askingInterval_str += either([
                ` every ${prettyMilliseconds(data.response.interval_ms, { verbose: true })}`,
            ]);
        }

    }


    //////////////////////////////////////////
    ////     next question asking time    ////
    //////////////////////////////////////////
    // if next question asking time are to be set
    if (data.request.next_unix){
        settingNextQuestionTime_repond = true;

        if (data.response.next_unix === 'failed to parse'){
            next_unix_str = either([
                `I think you tried to tell me to ask you at a certain time, but I didn't get it.`,
                `I think you tried to tell me to ask you at a certain time, but I didn't get it.`,
                `I think you tried to tell me to ask you at a certain time, but I didn't get it. You can try to phrase it differently.`,
            ]);
        } else if (data.response.next_unix === 'failed to save'){
            next_unix_str = `I'm terribly sorry! Something goes wrong when I'm trying to schedule a next question for you.`;
        } else if (typeof  data.response.next_unix === 'number'){
            next_unix_str = `I'll ask you next question at ${datetime_toRelevantString(data.response.next_unix, data.response.timezone, data.request.now.datetime)}.`;
        }

    }


    //////////////////////////////////////////
    ////     form and send a sentence     ////
    //////////////////////////////////////////
    let sentence = '';
    if (settingAskingRegularity_respond){
        sentence += `${askingTime_str}${askingTimeWindow_str}${askingInterval_str}`;
        if (settingNextQuestionTime_repond) {
            sentence += `. ${next_unix_str}`;
        }
    } else {
        if (settingNextQuestionTime_repond) {
            sentence += `${next_unix_str}`;
        }
    }


    messageParts.push(sentence);


    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}
