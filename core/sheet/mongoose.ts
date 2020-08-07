'use strict';
import * as config from '../../conf';
import mongoose from 'mongoose';

export type Mongoose = mongoose.Mongoose;

const mongoURI = config.app_url_mongo;
const mongoPORT = config.mongoPORT;
const options: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }


const dbPromise:Promise<Mongoose> = mongoose.connect(mongoURI, options);
dbPromise.then((res) => {
        console.log('mongoose.ts: connected to ' + mongoURI + ':' + mongoPORT);
    })
    .catch(error => {
        console.error('mongoose.ts: caught exception while trying to connect to the Mongoose DB \n' + error);
    });

    
export default {
    // Schema: mongoose.Schema,
    // Document: mongoose.Document,
    // connect: mongoose.connect,
    // model: mongoose.model,
    dbPromise: dbPromise
};
