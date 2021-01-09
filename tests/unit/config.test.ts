import * as config      from "../../src/conf";
import * as config_json from "../../src/config.json";

const ij = process.env.NODE_ENV === 'test';

if (ij){

    test('config.db_connection', () => {
        expect(config.db_connection).toBe(config_json.db_connection.default);
    });
    test('config.db_name', () => {
        expect(config.db_name).toBe(config_json.db_name.default);
    });
    test('config.db_username', () => {
        expect(config.db_username).toBe(config_json.db_username.default);
    });
    test('config.TOKEN', () => {
        expect(config.TOKEN).toBe(config_json.TOKEN.default);
    });
    test('config.PORT', () => {
        expect(config.PORT).toBe(config_json.PORT.default);
    });

} else {

    console.log(config);
    console.log(config_json);




}

