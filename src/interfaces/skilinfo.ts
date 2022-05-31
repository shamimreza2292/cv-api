
import { Document } from "mongoose";

export interface skilInfo extends Document {
    skills: [{
        _id?: any,
        skilName:  String,
        confidentLavel: Number,
    }]
    user: any
}



