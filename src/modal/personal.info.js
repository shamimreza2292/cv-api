"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const personalInfoSchema = new mongoose_1.Schema({
    name: { type: String },
    phoneNumber: { type: Number },
    objective: { type: String },
    email: { type: String, },
    address: { type: String },
    socialLink: { type: String },
    designation: { type: String },
    profileImage: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    nationality: { type: String },
    religion: { type: String },
    currentLocation: { type: String },
    user: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'user' }
});
// export class personalInfo extends Model{
// }
module.exports = mongoose_2.default.model("personalInfo", personalInfoSchema);
// module.exports = model<perosnalInfo>("personalInfo", personalInfoSchema);
