import {Schema} from 'mongoose';
import Mongoose  from 'mongoose';

import{RefarenceInfo} from '../interfaces/referenceInfo'

const referenceSchema = new Schema({
    references:[{
        name: {type: String, required: true},
        designation: {type:String, required: true},
        organizationName: {type: String, required: true}
    }],
    user: {type: Schema.Types.ObjectId, ref: 'user'}
})


module.exports = Mongoose.model<RefarenceInfo>('reference', referenceSchema);
