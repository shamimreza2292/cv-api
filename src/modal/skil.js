"use strict";
// const mongoosedb = require('mongoose');
// const skilSchema = mongoosedb.Schema;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const skilSchemaInfo = new mongoose_2.Schema({
    skills: [{
            skilName: { type: String, required: true },
            confidentLavel: { type: Number, required: true },
        }],
    user: { type: mongoose_2.Schema.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose_1.default.model('skil', skilSchemaInfo);
