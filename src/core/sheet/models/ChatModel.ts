'use strict';

import {Document, Schema, model} from "mongoose";
import { validStateName } from "../../../Interpretation/States";
import { confirmableSheetMethod } from "../sheet";
import { Iquestion, questionSchema } from "./QuestionModel";
import { Itag, tagSchema } from "./TagModel";



export type settingsSet = Partial<Settings>;

export type Settings = Ichat["Settings"];

export type settingsKey = keyof Settings;

export type settingsSetOrKey = settingsSet | settingsKey;

export type pending_method<M extends confirmableSheetMethod> = {
    sheet_method: M,
    args_tuple: string,
    // args_tuple: Parameters<typeof sheet[M]>,
    prev_state: validStateName;
};

export type awaiting_questionText = {
    Tags: string[]
};


export interface Ichat_schema {
    chatId: number;
    Questions?: Iquestion[];
    lastqid?: number;
    Tags?: Itag[];
    Pending_to_delete?: {
        msg_id: Schema.Types.ObjectId,
        delete_time: Date
    }[];
    Settings: {
        enabled: boolean,
        timezone?: number,
        asking_period_mins?: number,
        asking_time_of_day?: { from_hour: number, to_hour: number }
    };
    last_time_asked?: Date;
    running?: boolean;
    state: validStateName;
    Schedule?: { qid: number, datetime: Date },
    pending_method: pending_method<confirmableSheetMethod> | null,
    awaiting_questionText: awaiting_questionText | null;
}

export interface Ichat extends Document, Ichat_schema {}

/**
 * Members of this type are passed to mongoose.DocumentQuery.select method.
 * This is known as "query projection".
 */
export type Ichat_select =
    Partial<Ichat>
        |
    Partial<
        {[K in keyof Ichat_schema]: boolean}
            &
        {_id: boolean, _v: boolean}
    >


const chatSchema = new Schema({
    chatId:     { type: Number,                              required: true, unique: true },
    Questions:  { type: [questionSchema],                    required: false },
    lastqid:    { 
        type: Number,
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v),
        required: false
    },
    Tags: {
        type: [tagSchema],
        required: false },
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
    },
    pending_method: {
        type: {
            sheet_method: {
                type: String,
                required: true,
            },
            args_tuple: {
                type: String,
                required: false,
            },
            prev_state: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
    awaiting_questionText: {
        type: {
            Tags: [String],
        },
        required: false,
    },
});


export default model<Ichat>('Chat', chatSchema);
