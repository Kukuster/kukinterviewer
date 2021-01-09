'use strict';
import { Ichat } from "../../models/ChatModel";
import setSettings from "./setSettings";


/**
 * 
 * @param chatId id of Telegram Chat. Also used to identify a user's Chat document in the DB
 * @param {'on'|'off'} value 'on' or 'off'
 */
export default async function switchAsking(chatId: number, value: 'on' | 'off')
    : Promise<Ichat>
{

    return setSettings(chatId, {setting: "enabled", value: value === 'on'});

}

