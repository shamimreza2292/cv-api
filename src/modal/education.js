"use strict";
// const mongooseDb = require('mongoose');
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
// const schema = mongooseDb.Schema;
const educationSchema = new mongoose_1.Schema({
    educations: [{
            passingYear: { type: Number, required: true },
            nameOfDegree: { type: String, required: true },
            nameOfInstitute: { type: String, required: true }
        }],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose_2.default.model('education', educationSchema);
