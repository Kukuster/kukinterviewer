'use strict';
import ChatModel, { Ichat, Ichat_select } from "../../models/ChatModel";

/**
 * 
 * @param select Specifies which document fields to include or exclude (also known as the query "projection")
 * @returns result of querying Chat documents
 * 
 */
export default async function getAllChats(select?: Ichat_select): Promise<Ichat[]> {
    return ChatModel.find().select(select).exec();
}
