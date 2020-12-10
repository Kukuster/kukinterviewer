'use strict';

import TelegramBot from 'node-telegram-bot-api';
import ec from "./ec";
import { TOKEN } from './conf';
import { sep } from 'path';
import { emojify } from 'node-emoji';

if (!TOKEN) {
    process.exit(ec.noTelegramBotApiTOKEN);
}

export default TelegramBot;


export type sendMessageError = {
    errorMarkdown: Error,
    errorDefault: Error,
}

export type maybeTelegramBotMessage = TelegramBot.Message | sendMessageError;

export type TelegramBotSendMessageOptions_plus = TelegramBot.SendMessageOptions & {
    separator?: string,
    /**
    * should not make string a lot longer, or there's risk of an error sendingMessage
    */
    processBeforeSend?:                 (str: string) => string,
    processRightBeforeSend_default?:    (str: string) => string,
    
    /**
     * the full JSON of emojies:
     * https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
     */
    emojify?: boolean,
} & (
    {
        parse_mode?: 'Markdown' | undefined
        processRightBeforeSend_Markdown?:     (str: string) => string,
    } | {
        parse_mode: 'MarkdownV2',
        processRightBeforeSend_MarkdownV2?:   (str: string) => string,
    } | {
        parse_mode: 'HTML',
        processRightBeforeSend_HTML?:         (str: string) => string,
    }
)



export const fancyBot = false as const;

export const bot = new TelegramBot(TOKEN, { polling: true });


/**
 * Telegram formating: monospace text
 * Requires `parse_mode: 'Markdown'` option to be added to options object (3rd argument for bot.sendMessage method)
 * 
 * added endlines affect message design, but it doen't work on all devices without them
 */
export function monospace(str: string): string {
    return '```\n' + str + '\n```';
}




export const TelegramMessageLengthHardLimit = 4096;

export const TelegramMessageLengthSoftLimit = 4048;




export function cutMessageText(text: string)
    : string[]
{ 
    const len = text.length;

    const snippets: string[] = [];

    if (len > TelegramMessageLengthSoftLimit) { 
        for (let i = 0; i < len; i += TelegramMessageLengthSoftLimit){
            snippets.push(text.substr(i, TelegramMessageLengthSoftLimit));
        }
        return snippets;
    } else { 
        return [text];
    }
}


export function prepareMessages_fromSnippets(snippets: string[], separator: string)
    : string[]
{

    const messages = [];
    let collect = '';

    /**
     * When possible (when not exceeds number of characters limits),
     * groups adjacent snippets to form a single message
     */
    snippets.forEach(s => {
        // if the next snippet itself is bigger than the limit,
        if (separator.length + s.length > TelegramMessageLengthSoftLimit) { 
            // if collect has something, add it to array
            collect && messages.push(collect);
            // also, cut snippet in subsnippets, and add those to the array
            messages.push(...cutMessageText(s));

        // elseif collect + separator + snippet is bigger than the limit
        } else if (collect.length + separator.length + s.length > TelegramMessageLengthSoftLimit) {
            // add collect to array
            messages.push(collect);
            // set collect to the new snippet (and this snippet will already be within limits)
            collect = s;

        // else (here snippet is within limits and collect+separator+snippet is within limits)
        } else {
            // if collect has something, add snippet to it
            if (collect.length) {
                collect += separator + s;
            // else set collect to the new snippet (that itself is within the limits)
            } else {
                collect = s;
            }
        }

    });
    // after this, there may remain a dangling "collect", that's within limits but haven't been added
    // finally, if collect is not empty add it to the snippets
    if (collect) { 
        messages.push(collect);
    }


    return messages;
}




export function sendMessageSafely(chatId: string | number, text: string,    options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>

export function sendMessageSafely(chatId: string | number, texts: string[], options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>

export function sendMessageSafely(chatId: string | number, text: string | string[], options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>
{

    const messagesToSend: string[] = [];
    const sentMessages: maybeTelegramBotMessage[] = [];

    const separator = options?.separator ? options.separator : '\n\n';


    if (Array.isArray(text)) {
        messagesToSend.push(...prepareMessages_fromSnippets(text, separator));
    } else if (text.length > TelegramMessageLengthSoftLimit) { 
        messagesToSend.push(...prepareMessages_fromSnippets([text], separator));
    } else {
        messagesToSend.push(text);
    }


    const n = messagesToSend.length;

    console.log({ messagesToSend_n: n });

    
    // if func is not defined, set equal to the identity function
    const processBeforeSend =
        options?.processBeforeSend ?
            options.processBeforeSend :
            (str: string) => str;
    
    const processRightBeforeSend_default =
        options?.processRightBeforeSend_default ?
            options.processRightBeforeSend_default :
            (str: string) => str;
    
    let processRightBeforeSend_ParseMode: (str: string) => string;
    if (!options?.parse_mode || options?.parse_mode === 'Markdown') {
        processRightBeforeSend_ParseMode =
            options?.processRightBeforeSend_Markdown ?
                options.processRightBeforeSend_Markdown :
                (str: string) => str;
    } else if (options?.parse_mode === 'MarkdownV2') {
        processRightBeforeSend_ParseMode =
            options?.processRightBeforeSend_MarkdownV2 ?
                options.processRightBeforeSend_MarkdownV2 :
                (str: string) => str;
    } else if (options?.parse_mode === 'HTML') {
        processRightBeforeSend_ParseMode =
            options?.processRightBeforeSend_HTML ?
                options.processRightBeforeSend_HTML :
                (str: string) => str;
    }
    
    
    const processParseMode = (str: string) => processRightBeforeSend_ParseMode(processBeforeSend(str));
    const processDefault = (str: string) => processRightBeforeSend_default(processBeforeSend(str));
    

    if (options?.emojify) {
        console.log('sendMessageSafely: going to emojify');
        for (let i = 0; i < n; i++) {
            console.log({ before: messagesToSend[i], afterr: emojify(messagesToSend[i])});
            messagesToSend[i] = emojify(messagesToSend[i]);
        }
    }

    
    const parseMode = options?.parse_mode ? options?.parse_mode : 'Markdown';
    const parseMode_text = parseMode ? parseMode : 'default';

    const sendSequenceOfMessages = (async () => {
        let sentMessage;
        for (let i = 0; i < n; i++) {
            console.log(`messagesToSend[${i}]`, { s: messagesToSend[i] });    
            sentMessage = await bot.sendMessage(chatId, processParseMode(messagesToSend[i]), Object.assign(options, { parse_mode: parseMode }))
                .then((m) => {
                    console.log(`messagesToSend[${i}]: sent with ${parseMode_text} of length ${messagesToSend[i].length}`);
                    return m;
                })
                .catch((errorMarkdown: Error) => {
                    return bot.sendMessage(chatId, processDefault(messagesToSend[i]), Object.assign(options, { parse_mode: undefined }))
                        .then((m) => {
                            console.log(`messagesToSend[${i}]: sent with default parse_mode of length ${messagesToSend[i].length}`);
                            return m;
                        })
                        .catch((errorDefault: Error) => {
                            console.error(`failed to send message with both parse modes: `, {
                                chatId,
                                message: messagesToSend[i],
                                errors: { errorMarkdown, errorDefault },
                            });
                            return { errorMarkdown, errorDefault };
                        });
                });
            sentMessages.push(sentMessage);
        }
        return sentMessages;
    });


    return sendSequenceOfMessages();

}


