'use strict';
import * as config from '../../conf';
import mongoose from 'mongoose';
import { logf } from '../../reusable/console';

export type Mongoose = mongoose.Mongoose;


/*
    probably a temporary fix to a deprecation warning:
<< DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. >>

    see: https://github.com/Automattic/mongoose/issues/6890
*/
mongoose.set('useCreateIndex', true);


const options: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };


export const MongooseErrors = {
    failedToResolveDBCredentials: new Error('Failed to resolve DB credentials'),
    failedToConnect:              new Error('Failed to connect'),
} as const;


export const DBconnection = new Promise<Mongoose>((resolve, reject) => (async () => {
    let db_connection, db_name, db_username, db_userpassword;

    try {
        [db_connection, db_name, db_username, db_userpassword] = await Promise.all(
            [config.db_connection, config.db_name, config.db_username, config.db_userpassword]
        );
    } catch (error) {
        MongooseErrors.failedToResolveDBCredentials.message = error.message;
        MongooseErrors.failedToResolveDBCredentials.name    = error.name;
        MongooseErrors.failedToResolveDBCredentials.stack   = error.stack;
        reject(MongooseErrors.failedToResolveDBCredentials);
        return;
    }

    /**
     * expects db_connection field in config to be a format string
     * simple example: "mongodb://localhost/<db_name>"
     */
    const mongoURI = db_connection
                        .replace("<db_name>", db_name)
                        .replace("<db_username>", db_username)
                        .replace("<db_userpassword>", db_userpassword);

    mongoose.connect(mongoURI, options).then(DB => {
        console.log(`mongoose: connected to ${logf.u}${logf.fg.yellow}${mongoURI}${logf.end}`);
        process.on('beforeExit', async () => {
            try {
                await DB.disconnect();
                console.log(`mongoose: disconnected`);
            } catch (e){
                console.error(e);
                throw e;
            }
        });
        resolve(DB);
    }).catch(error => {
        console.error(`mongoose: caught exception while trying to connect to ${logf.u}${logf.fg.red}${mongoURI}${logf.end}`);
        MongooseErrors.failedToConnect.message = error.message;
        MongooseErrors.failedToConnect.name    = error.name;
        MongooseErrors.failedToConnect.stack   = error.stack;
        reject(MongooseErrors.failedToConnect);
    });

})());



export default mongoose;

