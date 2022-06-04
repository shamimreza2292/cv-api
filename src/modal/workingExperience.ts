// const mongooses = require('mongoose');
// const experienceSchema = mongooses.Schema;


import {Schema} from 'mongoose';
import mongoose from 'mongoose';
import {workingExperienceInfo} from "../interfaces/workingExperienceInfo";

const workingExperienceSchema = new Schema({
    experience: [{
        id: {type: String},
        companyName: {type: String, required: true},
        designation: {type: String, required: true},
        responsibilities: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date},
        continuing: {type: Boolean},
    }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
});


module.exports = mongoose.model<workingExperienceInfo>('workingExperience', workingExperienceSchema);

