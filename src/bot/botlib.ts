import { isNotPrimitive } from "../reusable/isPrimitive";



const CTChatType =['private',  'group',  'supergroup',  'channel'] as const;
type  TTChatType = typeof CTChatType[number];

export interface IIChat {
    id: number;
    type: TTChatType;
}

export interface IIUser {
    id: number,
    first_name: string,
    is_bot: boolean
}

export interface IIMessage {
    message_id: number;
    from?: IIUser;
    date: number;
    chat: IIChat;
    reply_to_message?: IIMessage;
    author_signature?: string;
    text?: string;
    reply_markup?: { inline_keyboard: any[][]; };
}


export function is_TTChatType(value: unknown): value is TTChatType {
    return CTChatType.includes(value as TTChatType);
}

export function is_IIChat(value: unknown): value is IIChat {
    return isNotPrimitive(value) &&
                  'id' in value && typeof value.id === 'number' && 
                'type' in value && is_TTChatType(value.type);
}

export function is_IIUser(value: unknown): value is IIUser {
    return isNotPrimitive(value) &&
                  'id' in value && typeof value.id === 'number' &&
          'first_name' in value && typeof value.first_name === 'string' &&
              'is_bot' in value && typeof value.is_bot === 'boolean';
}

export function is_IIMessage(value: unknown): value is IIMessage {
    return isNotPrimitive(value) &&
          'message_id' in value && typeof value.message_id === 'number' &&
                'date' in value && typeof value.date === 'number' &&
           (  !('from' in value)|| is_IIUser(value.from) )  &&
                'chat' in value && is_IIChat(value.chat);
}




export const TelegramMessageLengthHardLimit = 4096;

export const TelegramMessageLengthSoftLimit = 4048;


export type sendMessageError = {
    errorMarkdown: Error,
    errorDefault: Error,
}

export type maybeTelegramBotMessage = IIMessage | sendMessageError;

export interface IISendMessageOptions {
    disable_notification?: boolean;
    reply_to_message_id?: number;
    // reply_markup?: any;
    parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
    disable_web_page_preview?: boolean;
}

export type TelegramBotSendMessageOptions_plus = IISendMessageOptions & {
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
        parse_mode?: undefined
        processRightBeforeSend_noparse?:      (str: string) => string,
    } | {
        parse_mode: 'Markdown'
        processRightBeforeSend_Markdown?:     (str: string) => string,
    } | {
        parse_mode: 'MarkdownV2',
        processRightBeforeSend_MarkdownV2?:   (str: string) => string,
    } | {
        parse_mode: 'HTML',
        processRightBeforeSend_HTML?:         (str: string) => string,
    }
)


/**
 * Telegram formating: monospace text
 * Requires `parse_mode: 'Markdown'` option to be added to options object (3rd argument for bot.sendMessage method)
 * 
 * added endlines affect message design, but it doen't work on all devices without them
 */
export function monospace(str: string): string {
    return '```\n' + str + '\n```';
}




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


/**
 * From a given array of `snippets`, this forms an array of messages that necessarily do not exceed the `TelegramMessageLengthSoftLimit`.
 *  - When possible, glues adjacent `snippets` with `separator`
 *  - when necessary, cuts a snippet into smaller pieces (and those won't get glued with adjacent)
 * @param snippets message parts to send
 * @param separator a string that will be used to glue adjacent `snippets` when possible
 */
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


