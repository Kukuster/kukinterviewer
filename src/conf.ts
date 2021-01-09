'use strict';

import * as config from './config.json';
import { anyJSONvalue } from './reusable/anyJSONvalue.type';


type kukconfig = { [key: string]: {env: string, default: anyJSONvalue} }

/**
 * 
 * @param prop a config name. Config has `env` and `default` properties
 * If `env` property provided, then the function returns the value of the env variable which name is the value of this `env` property
 * If `env` property is empty, or the corresponding env variable is empty, then, lastly, the function returns the value of the `default` property
 * 
 */
const evalConfig = (config: kukconfig, prop: string): anyJSONvalue => 
    config[prop].env ?
        process.env[config[prop].env] || config[prop].default :
        config[prop].default;


export const db_name = <string>evalConfig(config,'db_name');

export const db_username = <string>evalConfig(config,'db_username');

export const db_userpassword = <string>evalConfig(config,'db_userpassword');

export const db_connection = <string>evalConfig(config,'db_connection');

export const db_PORT = <number>evalConfig(config,'db_PORT');


export const TOKEN = <string>evalConfig(config,'TOKEN');

export const PORT = <number>evalConfig(config,'PORT');

export const HOST = <string>evalConfig(config,'HOST');

// curently works only with 'GMT'
export const TZ  =  <string>evalConfig(config,'TZ');

export const APP_ENV = <'dev'|'prod'>evalConfig(config,'APP_ENV');
