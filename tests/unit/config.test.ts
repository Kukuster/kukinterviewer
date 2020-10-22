import * as config      from "../../src/conf"
import * as config_json from "../../src/config.json"

const ij = process.env.NODE_ENV === 'test';

if (ij){

    // console.log(config);
    // console.log(config_json);
    
    test('config.app_url', () => {
        expect(config.app_url).toBe(config_json.app_url.default);
    })
    test('config.db_name', () => {
        expect(config.db_name).toBe(config_json.db_name.default);
    })
    test('config.mongoPORT', () => {
        expect(config.mongoPORT).toBe(config_json.mongoPORT.default);
    })
    test('config.app_url_mongo', () => {
        expect(config.app_url_mongo).toBe(
            'mongodb://' +
            config_json.app_url.default +
            '/' //+
            + config_json.db_name.default
        );
        //console.log(config.app_url_mongo);
    })

} else {

    console.log(config);
    console.log(config_json);




}

