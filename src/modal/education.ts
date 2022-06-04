// const mongooseDb = require('mongoose');

import {Schema} from 'mongoose';
import Mongoose  from 'mongoose';

import {educationInfo} from '../interfaces/educationInfo';

// const schema = mongooseDb.Schema;


const educationSchema = new Schema({
    educations:[{
        passingYear: {type: Number, required: true},
        nameOfDegree: {type:String, required: true},
        nameOfInstitute: {type: String, required: true}
    }],
    user: {type: Schema.Types.ObjectId, ref: 'user'}
})


module.exports = Mongoose.model<educationInfo>('education', educationSchema);
