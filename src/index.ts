'use strict';

// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

import * as conf from "./conf";
import ec from "./ec";
import { DBconnection as connectToDB, MongooseErrors } from "./core/sheet/mongoose";
import startServer, { ServerErrors } from "./server";
import startBotApp from "./botapp";
import { BotErrors } from "./bot";



(async () => {

    /**
     * Read vital configs, set vital values
     */
    let APP_ENV: string;
    try {
        [process.env.TZ, APP_ENV] = await Promise.all(['GMT' || conf.TZ, conf.APP_ENV]);
    } catch (e){
        console.error('failed to resolve TZ and APP_ENV', e);
        process.exit(ec.failedToResolveConstants);
    }


    /**
     * Handling of unexpected exceptions and Promise rejections depends on the environment
     */
    if (APP_ENV !== 'prod') {
        process.on('uncaughtException', e => {
            console.error(e);
            process.exit(ec.uncaughtException);
        });
    }
    if (APP_ENV === 'dev') {
        process.on('unhandledRejection', e => {
            console.error(e);
            process.exit(ec.unhandledRejection);
        });
    }


    /**
     * Connect to DB
     * If passes, it is safe to use the resolved value elsewhere
     */
    try {
        await connectToDB;
    } catch (e){
        console.error('error',{e});
        if (e === MongooseErrors.failedToResolveDBCredentials){
            process.exit(ec.failedToResolveDBCredentials);
        } else if (e === MongooseErrors.failedToConnect){
            process.exit(ec.failedToConnectToDB);
        }
        console.error('unknown error occured while trying to connect to a mongoose DB');
        process.exit(ec.unknownError);
    }


    /**
     * Start server
     * If passes, it is safe to use the resolved value elsewhere
     */
    try {
        await startServer;
    } catch (e) {
        console.error(e);
        if (e === ServerErrors.failedToResolveAddress){
            process.exit(ec.failedToResolveServerAddress);
        } else if (e === ServerErrors.failedToListenToServerAddress){
            process.exit(ec.failedToListenToServerAddress);
        }
        console.error('unknown error occured while trying to start a server');
        process.exit(ec.unknownError);
    }


    /**
     * Start the Bot app
     * If passes, it is safe to use the resolved value elsewhere
     */
    try {
        await startBotApp();
    } catch (e) {
        console.error(e);
        if (e === BotErrors.noTelegramBotApiTOKEN){
            process.exit(ec.noTelegramBotApiTOKEN);
        } else if (e === BotErrors.failedToInstantiateBot){
            process.exit(ec.failedToInstantiateBot);
        } else if (e === BotErrors.failedToValidateTOKEN){
            process.exit(ec.failedToValidateTOKEN);
        }
        console.error('unknown error occured while trying to start a bot');
        process.exit(ec.unknownError);
    }


})();

