'use strict';

import {Document, Schema, model} from "mongoose";


export interface Iquestion extends Document {
    _id: Schema.Types.ObjectId,
    qid: number;
    questionText: string,
    enabled: boolean,
    Tags: string[]
};


export const questionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    qid: {
        type: Number, 
        required: true,
        unique: true, 
        get: (v: number) => Math.round(v),
        set: (v: number) => Math.round(v),
    },
    questionText:   { type: String,  required: true},
    enabled:        { type: Boolean, required: true},
    Tags:           { type: [String],required: true}
});


export default model<Iquestion>('Question', questionSchema);
