import { Document } from 'mongoose';

export declare interface educationInfo extends Document {
    educations:[{
        _id?: any,
        passingYear:   Number,
        nameOfDegree: String,
        nameOfInstitute: String
    }]
}

