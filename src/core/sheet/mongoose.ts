'use strict';
import * as config from '../../conf';
import mongoose from 'mongoose';
import { logf } from '../../reusable/console';

export type Mongoose = mongoose.Mongoose;

const mongoURI = config.db_connection
                        .replace("<db_name>",config.db_name)
                        .replace("<db_username>",config.db_username)
                        .replace("<db_userpassword>",config.db_userpassword);

const mongoPORT = config.db_PORT;

const options: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };


/*
    probably a temporary fix to a deprecation warning:
<< DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. >>

    see: https://github.com/Automattic/mongoose/issues/6890
*/
mongoose.set('useCreateIndex', true);


const dbPromise:Promise<Mongoose> = mongoose.connect(mongoURI, options);

dbPromise.then((res) => {
        console.log(`mongoose: connected to ${logf.u}${logf.fg.yellow}${mongoURI}:${mongoPORT}${logf.end}`);
    })
    .catch(error => {
        console.error(`mongoose: caught exception while trying to connect to ${logf.u}${logf.fg.red}${mongoURI}:${mongoPORT}${logf.end} \n` + error);
    });



export default mongoose;

export const DBconnection = dbPromise;
