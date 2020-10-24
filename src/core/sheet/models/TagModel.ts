'use strict';

import {Document, Schema, model} from "mongoose";


export interface Itag extends Document {
    _id: Schema.Types.ObjectId,
    str: string,
    enabled: boolean
};


export const tagSchema = new Schema({
    _id: Schema.Types.ObjectId,
    str: String,
    enabled: Boolean
});


export default model<Itag>('Tag', tagSchema);
