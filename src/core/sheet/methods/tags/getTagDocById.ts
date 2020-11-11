'use strict';
import { Schema } from "mongoose";
import queryChat from "../functions/queryChat";

export default async function getTagDocById(chatId: number, tagId: Schema.Types.ObjectId){
    return queryChat(chatId, {Tags: true}, (chat) => {
        return chat.Tags!.find(t => t._id === tagId);
    });
};

