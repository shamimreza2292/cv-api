

import { Document } from "mongoose";

export interface workingExperienceInfo extends Document{
    experience: [{
        _id?: any,
        companyName:  String,
        designation: String,
        responsibilities: String,
        startDate: String,
        endDate: Date,
        continuing: Boolean
    }]
}

