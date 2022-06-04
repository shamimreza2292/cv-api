
import { Document } from 'mongoose';


export declare interface RefarenceInfo extends Document{
   references: [{
    _id?: any,
    name: String,
    designation: String,
    organizationName: String
   }]
}
 