"use strict";
// const mongooses = require('mongoose');
// const experienceSchema = mongooses.Schema;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const workingExperienceSchema = new mongoose_1.Schema({
    experience: [{
            id: { type: String },
            companyName: { type: String, required: true },
            designation: { type: String, required: true },
            responsibilities: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            continuing: { type: Boolean },
        }],
    user: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'user', required: true }
});
module.exports = mongoose_2.default.model('workingExperience', workingExperienceSchema);
