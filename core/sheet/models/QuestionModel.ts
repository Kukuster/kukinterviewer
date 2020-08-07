import {Document, Schema, model} from "mongoose";


export interface Iquestion extends Document {
    qid: number;
    questionText: string,
    enabled: boolean,
    Tags: string[]
}


const questionSchema = new Schema({
    qid:            { type: Number,  required: true, unique: true },
    questionText:   { type: String,  required: true},
    enabled:        { type: Boolean, required: true },
    Tags:           { type: [String],required: true}
})


export default model<Iquestion>('Question', questionSchema);
