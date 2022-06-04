import { Document } from "mongoose";

export interface userInfo extends Document {
    email:  String,
    password: any 
}
