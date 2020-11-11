'use strict';

import TelegramBot from 'node-telegram-bot-api';
import ec from "./ec";
import { TOKEN } from './conf';

if (!TOKEN) {
    process.exit(ec.noTelegramBotApiTOKEN);
}

export default TelegramBot;

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


