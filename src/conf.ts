'use strict';

import { anyJSONvalue } from './reusable/anyJSONvalue.type';


export type kukconfig = { [key: string]: { env: string, default: anyJSONvalue } }

/**
 * This is the type of config the app extects to have.
 * Changes/improvements have to be  based on / stem from  this interface.
 * All other literal occurances of this data structure:
 *  - the default fallback config below,
 *  - ./config.example.json,
 *  - and the working config: ./config.json),
 * have to be manually corrected in accord.
 * 
 * A price of an unDRY PITA that we pay for:
 *  - cohesion,
 *  - type safety,
 *  - flexible configration of the app,
 */
export interface kukinterviewerconfig extends kukconfig {
    db_connection: {
        env: string,
        default: string,
    },
    db_username: {
        env: string,
        default: string,
    },
    db_userpassword: {
        env: string,
        default: string,
    },
    db_name: {
        env: string,
        default: string,
    },
    db_PORT: {
        env: string,
        default: number | string,
    },


    TOKEN: {
        env: string,
        default: string,
    },
    PORT: {
        env: string,
        default: number | string,
    },
    HOST: {
        env: string,
        default: string,
    },
    TZ: {
        env: string,
        default: string,
    },
    APP_ENV: {
        env: string,
        default: string,
    },
}

export const configFilePath = 'config.json';

export const config_pending: Promise<kukinterviewerconfig> = import('./'+configFilePath).then(json => {
    return json.default;
}).catch(() => (
/**
 * default fallback config, if the file has not been provided or could not been read
 */
{
    db_connection: {
        env: "MONGODB_URI",
        default: "mongodb://localhost/<db_name>"
    },
    db_username: {
        env: "MONGODB_USERNAME",
        default: "",
    },
    db_userpassword: {
        env: "MONGODB_USERPASSWORD",
        default: "",
    },
    db_name: {
        env: "MONGODB_DBNAME",
        default: "kukinterviewer",
    },
    db_PORT: {
        env: "MONGODB_PORT",
        default: 27017,
    },

    TOKEN: {
        env: "TOKEN",
        default: "",
    },
    PORT: {
        env: "PORT",
        default: 5000,
    },
    HOST: {
        env: "HOST",
        default: "localhost",
    },
    TZ: {
        env: "TZ",
        default: "GMT",
    },
    APP_ENV: {
        env: "APP_ENV",
        default: "dev",
    },
}));


/**
 * 
 * @param config_pending Promise of a kukconfig object
 * @param prop a config name. Config has `env` and `default` properties
 * If `env` property provided, then the function returns the value of the env variable which name is the value of this `env` property
 * If `env` property is empty, or the corresponding env variable is empty, then, lastly, the function returns the value of the `default` property
 * 
 */
const evalKukConfig = async <C extends kukconfig, P extends Promise<C>, K extends keyof C, V extends C[K]["default"]>(config_pending: P, prop: K)
: Promise<V | string> =>
{
    let val : V | string | undefined;
    const config = await config_pending;

    if (config[prop] && config[prop].env) {
        val = process.env[config[prop].env];
    }

    if (val !== undefined){
        return val;
    } else {
        return config[prop].default as V;
    }
};

/**
 * Type-friendly version of `evalKukConfig` specifically for this app's config
 */
const evalKukinterviewerConfig = async <C extends kukinterviewerconfig, P extends Promise<C>, K extends keyof C, V extends C[K]["default"]>(config_pending: P, prop: K) =>
    evalKukConfig<C, P, K, V>(config_pending, prop);




////////////////////////////////////////
/////  EXPORTS (resolved configs)  /////
////////////////////////////////////////

export const db_name = evalKukinterviewerConfig(config_pending,'db_name');

export const db_username = evalKukinterviewerConfig(config_pending,'db_username');

export const db_userpassword = evalKukinterviewerConfig(config_pending,'db_userpassword');

export const db_connection = evalKukinterviewerConfig(config_pending,'db_connection');

export const db_PORT = evalKukinterviewerConfig(config_pending,'db_PORT');


export const TOKEN = evalKukinterviewerConfig(config_pending,'TOKEN');

export const PORT = evalKukinterviewerConfig(config_pending,'PORT');

export const HOST = evalKukinterviewerConfig(config_pending,'HOST');

// curently works only with 'GMT'
export const TZ  =  evalKukinterviewerConfig(config_pending,'TZ');

export const APP_ENV = evalKukinterviewerConfig(config_pending,'APP_ENV');


