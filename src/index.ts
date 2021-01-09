'use strict';

// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

import botapp from "./botapp";
import { TZ } from "./conf";
import { DBconnection } from "./core/sheet/mongoose";
import server from "./server";

process.env.TZ = TZ;

DBconnection;
server;
botapp();
