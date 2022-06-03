"use strict";
// const express = require('express');
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
// const personalData = require('../controler/personal.info.controler');
// const workingExperienceControler = require('../controler/workingExperience.controler');
// const skilControler = require('../controler/skil.controler');
// const educationControler = require('../controler/education.controler');
const personal_info_controler_1 = require("../controler/personal.info.controler");
const education_controler_1 = require("../controler/education.controler");
const skil_controler_1 = require("../controler/skil.controler");
const workingExperience_controler_1 = require("../controler/workingExperience.controler");
const reference_controler_1 = require("../controler/reference.controler");
const auth_controler_1 = require("../controler/auth.controler");
router.post('/personalInfo', personal_info_controler_1.PersonalInfoControler.postPersonalInfo);
router.get('/personalInfo', personal_info_controler_1.PersonalInfoControler.getPersonalData);
router.post('/workingexperience', workingExperience_controler_1.workingExperienceControler.postWorkingExperience);
router.get('/workingexperience', workingExperience_controler_1.workingExperienceControler.getWorkingExperience);
router.post('/skil', skil_controler_1.skilControler.postSkil);
router.get('/skil', skil_controler_1.skilControler.getSkil);
router.post('/educations', education_controler_1.educationControler.educationPost);
router.get('/educations', education_controler_1.educationControler.getEducations);
router.post('/references', reference_controler_1.ReferenceControler.referencePost);
router.get('/references', reference_controler_1.ReferenceControler.getReference);
// login router
router.post('/signup', auth_controler_1.loginControler.postUser);
router.post('/login', auth_controler_1.loginControler.postlogin);
router.get('/login', auth_controler_1.loginControler.getLogin);
router.post('/refresToken', auth_controler_1.loginControler.refreshToken);
router.get('/logout', auth_controler_1.loginControler.logout);
module.exports = router;
// export class Router  {
//     static router = express.Router();
//     public static getAllRoute (){
//         this.router.post('/personalInfo', PersonalInfoControler.postPersonalInfo);
//         return this.router;
//     }
// }
