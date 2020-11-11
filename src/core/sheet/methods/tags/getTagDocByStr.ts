'use strict';
import queryChat from "../functions/queryChat";

export default async function getTagDocByStr(chatId: number, tagStr: string){
    return queryChat(chatId, {Tags: true}, (chat) => {
        return chat.Tags!.find(t => t.str === tagStr);
    });
};

