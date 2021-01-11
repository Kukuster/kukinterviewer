import * as config from "../../src/conf";



const calculated_config_pending = config.config_pending;



const getValueFromJSON = (json: config.kukinterviewerconfig, field: string) => {
    if (json[field].env) {
        const envVal = process.env[json[field].env];
        if (envVal){
            return envVal;
        }
    }
    return json[field].default;
};

let config_json_file: config.kukinterviewerconfig | null;
let calculated_json: config.kukinterviewerconfig;



beforeAll(async () => {
    config_json_file = await import('../../src/' + config.configFilePath).catch(e => null);
    calculated_json = await calculated_config_pending;
    // console.log({ config_json_file, calculated_json });
});



////////////////////////////////////////////////////////////
///////////                                      ///////////
///////////   Custom config file (if provided)   ///////////
///////////                                      ///////////
////////////////////////////////////////////////////////////

test(`cutsom config file "${config.configFilePath}": db_connection`, async () => {
    if (config_json_file){
        const db_connection = await config.db_connection;
        // console.log({ db_connection });
        expect(db_connection).toBe(getValueFromJSON(config_json_file, "db_connection"));
        expect(db_connection).toBe(getValueFromJSON(calculated_json, "db_connection"));
    }
});
test(`cutsom config file "${config.configFilePath}": db_name`, async () => {
    if (config_json_file){
        const db_name = await config.db_name;
        // console.log({db_name});
        expect(db_name).toBe(getValueFromJSON(config_json_file, "db_name"));
        expect(db_name).toBe(getValueFromJSON(calculated_json, "db_name"));
    }
});
test(`cutsom config file "${config.configFilePath}": db_username`, async () => {
    if (config_json_file){
        const db_username = await config.db_username;
        // console.log({db_username});
        expect(db_username).toBe(getValueFromJSON(config_json_file, "db_username"));
        expect(db_username).toBe(getValueFromJSON(calculated_json, "db_username"));
    }
});
test(`cutsom config file "${config.configFilePath}": TOKEN`, async () => {
    if (config_json_file){
        const TOKEN = await config.TOKEN;
        // console.log({TOKEN});
        expect(TOKEN).toBe(getValueFromJSON(config_json_file, "TOKEN"));
        expect(TOKEN).toBe(getValueFromJSON(calculated_json, "TOKEN"));
    }
});
test(`cutsom config file "${config.configFilePath}": PORT`, async () => {
    if (config_json_file){
        const PORT = await config.PORT;
        // console.log({PORT});
        expect(PORT).toBe(getValueFromJSON(config_json_file, "PORT"));
        expect(PORT).toBe(getValueFromJSON(calculated_json, "PORT"));
    }
});
test(`cutsom config file "${config.configFilePath}": TZ`, async () => {
    if (config_json_file){
        const TZ = await config.TZ;
        // console.log({TZ});
        expect(TZ).toBe(getValueFromJSON(config_json_file, "TZ"));
        expect(TZ).toBe(getValueFromJSON(calculated_json, "TZ"));
    }
});
test(`cutsom config file "${config.configFilePath}": HOST`, async () => {
    if (config_json_file){
        const HOST = await config.HOST;
        // console.log({HOST});
        expect(HOST).toBe(getValueFromJSON(config_json_file, "HOST"));
        expect(HOST).toBe(getValueFromJSON(calculated_json, "HOST"));
    }
});



////////////////////////////////////////////////////////////
///////////                                      ///////////
///////////      Default config (if no file)     ///////////
///////////                                      ///////////
////////////////////////////////////////////////////////////

test(`default config: db_connection`, async () => {
    if (!config_json_file){
        expect(await config.db_connection).toBe(getValueFromJSON(calculated_json, "db_connection"));
    }
});
test(`default config: db_name`, async () => {
    if (!config_json_file){
        expect(await config.db_name).toBe(getValueFromJSON(calculated_json, "db_name"));
    }
});
test(`default config: db_username`, async () => {
    if (!config_json_file){
        expect(await config.db_username).toBe(getValueFromJSON(calculated_json, "db_username"));
    }
});
test(`default config: TOKEN`, async () => {
    if (!config_json_file){
        expect(await config.TOKEN).toBe(getValueFromJSON(calculated_json, "TOKEN"));
    }
});
test(`default config: PORT`, async () => {
    if (!config_json_file){
        expect(await config.PORT).toBe(getValueFromJSON(calculated_json, "PORT"));
    }
});
test(`default config: TZ`, async () => {
    if (!config_json_file){
        expect(await config.TZ).toBe(getValueFromJSON(calculated_json, "TZ"));
    }
});
test(`default config: HOST`, async () => {
    if (!config_json_file){
        expect(await config.HOST).toBe(getValueFromJSON(calculated_json, "HOST"));
    }
});


