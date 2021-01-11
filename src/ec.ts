import { logf } from "./reusable/console";

/**
 * nodejs exit codes (if a FATAL ERROR occurs)
 */
const ec = {
    failedToResolveConstants: 100,
    /**
     * no telegram bot api TOKEN provided
     */
    failedToResolveDBCredentials: 101,
    failedToConnectToDB: 102,
    failedToResolveServerAddress: 103,
    failedToListenToServerAddress: 104,
    noTelegramBotApiTOKEN: 105,
    failedToInstantiateBot: 106,
    failedToValidateTOKEN: 107,

    unknownError: 200,
    uncaughtException: 201,
    unhandledRejection: 202,

} as const;
type ec = typeof ec[keyof typeof ec];

process.on('exit', function (code) {
    let o = '';
    const ERROR = `${logf.fg.red}${logf.bright}[FATAL ERROR]${logf.end}`;
    const terminating___ = `${logf.dim}Terminating node.js with exit code ${logf.bright}${code}${logf.end}`;

    switch(code){
        case ec.failedToResolveConstants:
            o = `${ERROR} failed to resolve some vital constants or configurations\n` +
                `${terminating___}`;
            break;

        case ec.failedToResolveDBCredentials:
            o = `${ERROR} failed to resolve necessary credentials for DB connection\n` +
                `${terminating___}`;
            break;

        case ec.failedToConnectToDB:
            o = `${ERROR} failed to establish connection with the DB\n` +
                `${terminating___}`;
            break;

        case ec.failedToResolveServerAddress:
            o = `${ERROR} failed to resolve address for starting a server\n` +
                `${terminating___}`;
            break;

        case ec.failedToListenToServerAddress:
            o = `${ERROR} failed to start server listening at a given address\n` +
                `${terminating___}`;
            break;

        case ec.noTelegramBotApiTOKEN:
            o = `${ERROR} no Telegram Bot API TOKEN provided, therefore unable to instantiate a bot.\n` +
                `${terminating___}`;
            break;

        case ec.failedToInstantiateBot:
            o = `${ERROR} failed to instantiate a Telegram bot\n` +
                `${terminating___}`;
            break;

        case ec.failedToValidateTOKEN:
            o = `${ERROR} failed to validate Telegram Bot API TOKEN via Telegram API\n` +
                `${terminating___}`;
            break;



        case ec.unknownError:
            o = `${ERROR} Unknown Error\n` +
                `${terminating___}`;
            break;

        case ec.uncaughtException:
            o = `${ERROR} ${logf.bright}Unexpected Uncaught Exception${logf.end}\n` +
                `${terminating___}`;
            break;

        case ec.unhandledRejection:
            o = `${ERROR} ${logf.bright}Unexpected Unhandled Rejection${logf.end}\n` +
                `${terminating___}`;
            break;

        default:
            o = `${terminating___}`;
            break;
    }
    return console.log(o);
});


export default ec;

