'use strict';

import TelegramBot from 'node-telegram-bot-api';
import ec from "./ec";
import { TOKEN } from './conf';

if (!TOKEN) {
    process.exit(ec.noTelegramBotApiTOKEN);
}

export default new TelegramBot(TOKEN, { polling: true });


