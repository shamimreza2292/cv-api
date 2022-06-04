 
import { Document, Schema, Model, model} from "mongoose";
import mongoose from 'mongoose'
import {perosnalInfo} from '../interfaces/personalinfo'

const personalInfoSchema = new Schema({
    name: {type: String},
    phoneNumber: {type: Number},
    objective: {type: String},// objective
    email: {type: String, },
    address: {type: String},
    socialLink: {type: String},
    designation: {type: String},
    profileImage: {type: String},
    fatherName: {type: String} ,
    motherName: {type: String} ,
    dateOfBirth: {type: String} ,
    gender: {type: String} ,
    maritalStatus : {type: String} ,
    nationality : {type: String} ,
    religion : {type: String} ,
    currentLocation : {type: String} ,


    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}); 

// export class personalInfo extends Model{
    
// }

module.exports = mongoose.model<perosnalInfo>("personalInfo", personalInfoSchema);
// module.exports = model<perosnalInfo>("personalInfo", personalInfoSchema);
