import { Document } from 'mongoose';


export declare interface perosnalInfo extends Document{
    name: String,
    phoneNumber: Number,
    objective:  String,
    email: String,
    address: String,
    socialLink: String,
    designation: String,
    profileImage: String,
    fatherName: String,
    motherName: String,
    dateOfBirth: String,
    gender: String,
    maritalStatus: String,
    nationality: String,
    religion: String,
    currentLocation: String,
    user: string | object
}
 

 


