import * as config from '../../conf';
import mongoose from 'mongoose';

export type Mongoose = mongoose.Mongoose;

const mongoURI = config.app_url_mongo;
const mongoPORT = config.mongoPORT;
const options: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }

var db: Mongoose;

const dbPromise:Promise<Mongoose> = mongoose.connect(mongoURI, options);
dbPromise.then((res) => {
        console.log('mongoose.ts: connected to ' + mongoURI + ':' + mongoPORT);
        // console.log(res);
        db = res;
    })
    .catch(error => {
        // response = JSON.stringify({
        //     error: error
        // }, null, 2);
        console.log('mongoose.ts: caught exception while trying to connect to the Mongoose DB \n' + error);
    });

export default {
    Schema: mongoose.Schema,
    Document: mongoose.Document,
    connect: mongoose.connect,
    model: mongoose.model,
    dbPromise: dbPromise
};
