import { IIMessage } from "../../../bot/botlib";
import { sendMessageSafely } from "../../../bot/bot";
import { maybeTelegramBotMessage } from "../../../bot/botlib";
import { turnTagsOnOff_execute_return } from "./execute";
import either from "../../../reusable/randomElement";
import formList from "../../textForming/formList";
import youDontHaveTags from "../../textForming/youDontHaveTags";


export default async function turnTagsOnOff_display(msg: IIMessage, data: turnTagsOnOff_execute_return)
    : Promise<maybeTelegramBotMessage[]>
{
    
    const chatId = msg.chat.id;
    
    const messageParts: string[] = [];

    const status = data.request.turn === 'on' ? true : false;
    
    if (data.action === 'execute sheet method') {
        if (data.response.hasChanges){
            if (data.request.Tags === 'all'){
                messageParts.push(either([
                    `${status?'Enbaled':'Disabled'} all your tags`,
                    `${status?'Enbaled':'Disabled'} all tags in ${either(['our', 'your'])} questions list`,
                ]));
            } else {
                if (data.response.tagsAffected.length === 1){
                    messageParts.push(either([
                        `${status?'Enbaled':'Disabled'} tag #${data.response.tagsAffected[0]}`,
                    ]));
                } else if (data.response.tagsAffected.length > 1) {
                    messageParts.push(either([
                        `${status?'Enbaled':'Disabled'} the following tags: \n` +
                        `<i>${formList(data.response.tagsAffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
                if (data.response.tagsUnaffected.length === 1){
                    messageParts.push(either([
                        `Tag #${data.response.tagsUnaffected[0]} is already ${status?'enbaled':'disabled'}`,
                    ]));
                } else if (data.response.tagsUnaffected.length > 1) {
                    messageParts.push(either([
                        `The following tags are already ${status?'enbaled':'disabled'}:\n` +
                        `<i>${formList(data.response.tagsUnaffected, { prefix: '#', comma: ',', conj: 'and' })}</i>`,
                    ]));
                }
            }

        } else { // if there were no changes after an execution

            if (data.response.reason === 'no such Tags'){
                if (data.request.Tags === 'all'){
                    messageParts.push(youDontHaveTags());

                } else { // if requested tags by exact tag strings
                    if (data.request.Tags.length === 1){
                        messageParts.push(either([
                            `Sorry, there's no tag #${data.request.Tags[0]}`,
                            `Sorry, there's no tag #${data.request.Tags[0]} in out questions list`,
                            `Sorry, we don't have a tag #${data.request.Tags[0]}`,
                            `Sorry, I don't have a tag #${data.request.Tags[0]}`,
                        ]));
                    } else if (data.request.Tags.length > 1) {
                        messageParts.push(either([
                            `You've asked me to ${status?'enable':'disable'} tags <i>${formList(data.request.Tags,{prefix:'#',comma:',',conj:'and'})}</i>\n`
                            +
                            `Sorry, there are no such tags`,
                        ]));
                    }
                }

            } else if (data.response.reason === 'the Tags already have the specified status') {

                if (data.request.Tags === 'all'){
                    if (data.queriedTags.length  === 1) {
                        messageParts.push(either([
                            `Your only tag, <i>#${data.queriedTags[0].str}</i>, ${either(['is already','has already been'])} ${status?'enabled':'disabled'}`,
                        ]));
                    } else if (data.queriedTags.length > 1) {
                        messageParts.push(either([
                            `All your tags are already ${status?'enabled':'disabled'}`,
                        ]));
                    }
                } else { // if requested tags by exact tag strings
                    if (data.queriedTags.length === 1) {
                        messageParts.push(either([
                            `Tags <i>#${data.queriedTags[0].str}</i> is already ${status?'enabled':'disabled'}`,
                        ]));
                    } else if (data.queriedTags.length > 1) {
                        messageParts.push(either([
                            `Tags <i>${formList(data.queriedTags.map(T=>T.str), { prefix: '#', conj: '&' })}</i> are already ${status?'enabled':'disabled'}`,
                        ]));
                    }
                }
            }
        }

    } else if (data.action === 'ask confirmation') {
        // are you sure?

        if (data.request.Tags === 'all'){

            messageParts.push(either([
                `Are you sure you want to ${status?'enable':'disable'} all ${either(['your','our'])} tags?`,
                `Are you sure you want to ${status?'enable':'disable'} all tags in your questions list?`,
            ]));

        } else {

            messageParts.push(either([
                `Are you sure you want to ${status?'enable':'disable'} the following tags: <i>${formList(data.queriedTags.map(T=>T.str))}</i>?`,
                `Are you sure you want to ${status?'enable':'disable'} tags <i>${formList(data.queriedTags.map(T=>T.str))}</i>?`,
            ]));

        }


    }

    return sendMessageSafely(chatId, messageParts, {
        parse_mode: 'HTML',
    });

}