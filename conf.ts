import * as config from './config.json';
import { anyJSONvalue } from './core/anyJSONvalue.type';


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


export const app_url = <string>evalConfig(config,'app_url');
export const app_url_http = 'http://' + app_url + '/';
export const app_url_https = 'https://' + app_url + '/';


export const db_name = <string>evalConfig(config,'db_name');
export const app_url_mongo = 'mongodb://' + app_url + '/' + db_name;

export const mongoPORT = <number>evalConfig(config,'mongoPORT');

export const TOKEN = <string>evalConfig(config,'TOKEN');

export const PORT = <number>evalConfig(config,'PORT')

export const HOST = <string>evalConfig(config,'HOST');

