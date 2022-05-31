// const mongoosedb = require('mongoose');
// const skilSchema = mongoosedb.Schema;


import mongoose from "mongoose";
import {Schema} from 'mongoose' ;
import { skilInfo } from "../interfaces/skilinfo";



const skilSchemaInfo = new Schema({
    skills: [{
        skilName: {type: String, required: true},
        confidentLavel: {type: Number, required: true},
    }],    
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});


module.exports = mongoose.model<skilInfo>('skil', skilSchemaInfo);

