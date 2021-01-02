'use strict';

import TelegramBot from 'node-telegram-bot-api';
import ec from "./ec";
import { TOKEN } from './conf';
import { emojify } from 'node-emoji';
import { TelegramBotSendMessageOptions_plus, maybeTelegramBotMessage, prepareMessages_fromSnippets, TelegramMessageLengthSoftLimit } from './botlib';

if (!TOKEN) {
    process.exit(ec.noTelegramBotApiTOKEN);
}

export default TelegramBot;



export const fancyBot = false as const;

export const bot = new TelegramBot(TOKEN, { polling: true });




export function sendMessageSafely(chatId: string | number, text: string,    options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>

export function sendMessageSafely(chatId: string | number, texts: string[], options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>

export function sendMessageSafely(chatId: string | number, text: string | string[], options?: TelegramBotSendMessageOptions_plus)
    : Promise<maybeTelegramBotMessage[]>
{

    const messagesToSend: string[] = [];
    const sentMessages: maybeTelegramBotMessage[] = [];

    const separator = options?.separator ? options.separator : '\n\n\n';


    if (Array.isArray(text)) {
        messagesToSend.push(...prepareMessages_fromSnippets(text, separator));
    } else if (text.length > TelegramMessageLengthSoftLimit) { 
        messagesToSend.push(...prepareMessages_fromSnippets([text], separator));
    } else {
        messagesToSend.push(text);
    }


    const n = messagesToSend.length;

    
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
    if (!options?.parse_mode) {
        processRightBeforeSend_ParseMode =
            options?.processRightBeforeSend_noparse ?
                options.processRightBeforeSend_noparse :
                (str: string) => str;
    } else if (options?.parse_mode === 'Markdown') {
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
        for (let i = 0; i < n; i++) {
            messagesToSend[i] = emojify(messagesToSend[i]);
        }
    }

    
    const parseMode = options?.parse_mode ? options?.parse_mode : 'noparse';
    const parseMode_text = parseMode ? parseMode : 'default';

    const sendSequenceOfMessages = (async () => {
        let sentMessage;
        for (let i = 0; i < n; i++) {
            if (messagesToSend[i].trim()){
                sentMessage = await bot.sendMessage(chatId, processParseMode(messagesToSend[i]), Object.assign(options, { parse_mode: parseMode }))
                    .then((m) => {
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
        }
        return sentMessages;
    });


    return sendSequenceOfMessages();

}

