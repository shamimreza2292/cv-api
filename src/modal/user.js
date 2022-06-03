"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    // confirmPassword: {type: String}
});
module.exports = mongoose_2.default.model('user', userSchema);
