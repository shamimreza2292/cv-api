"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const referenceSchema = new mongoose_1.Schema({
    references: [{
            name: { type: String, required: true },
            designation: { type: String, required: true },
            organizationName: { type: String, required: true }
        }],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose_2.default.model('reference', referenceSchema);
