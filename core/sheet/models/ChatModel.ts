'use strict';

import {Document, Schema, model} from "mongoose";
import { Iquestion, questionSchema } from "./QuestionModel";
// import { Schema } from "mongoose";
// const mong = mongoose.default;

// const Schema = mong.Schema;
// const Document = mong.Document;
// const model = mong.model;





export type settingsSet = {
        enabled?: boolean,
        timezone?: number,
        asking_period_mins?: number,
        asking_time_of_day?: { from_hour: number, to_hour: number }
};

export type Settings = Ichat["Settings"];

export type settingsKey = keyof Settings;

export type settingsSetOrKey = settingsSet | settingsKey;



export interface Ichat extends Document {
    chatId: number;
    Questions?: Iquestion[];
    lastqid?: number;
    Pending_to_delete?: [{
        msg_id: Schema.Types.ObjectId,
        delete_time: Date
    }];
    Settings: {
        enabled: boolean,
        timezone?: number,
        asking_period_mins?: number,
        asking_time_of_day?: { from_hour: number, to_hour: number }
    };
    last_time_asked?: Date;
    running?: boolean;
    state: string;
    Schedule?: { qid: number, datetime: Date }
}


const chatSchema = new Schema({
    chatId:     { type: Number,                              required: true, unique: true },
    Questions:  { type: [questionSchema],                    required: false },
    lastqid:    { 
        type: Number,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v),
        required: false
    },
    Pending_to_delete: { 
        type: [{
            msg_id: Schema.Types.ObjectId, 
            delete_time: Date
        }],
        required: false
    },
    Settings: { 
        type: {
            enabled:  { type: Boolean, required: true },
            timezone: { type: Number, required: false },
            asking_period_mins: { type: Number, required: false },
            asking_time_of_day: { 
                type: {
                    from_hour: Number,
                    to_hour: Number
                },
                    required: false
            }
        },
        required: true
    },
    last_time_asked: { type: Date,          required: false },
    running:         { type: Boolean,       required: false },
    state:           { type: String,        required: true },
    Schedule: {
        type: {
            qid: Number,
            datetime: Date
        },
        required: false
    }
})


export default model<Ichat>('Chat', chatSchema);
