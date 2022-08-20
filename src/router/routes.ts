

// const express = require('express');

import express from 'express'

export const router = express.Router();
// const personalData = require('../controler/personal.info.controler');
// const workingExperienceControler = require('../controler/workingExperience.controler');
// const skilControler = require('../controler/skil.controler');
// const educationControler = require('../controler/education.controler');

import {PersonalInfoControler} from '../controler/personal.info.controler'; 
import {educationControler} from '../controler/education.controler';
import {skilControler} from '../controler/skil.controler';
import {workingExperienceControler} from '../controler/workingExperience.controler';
import { ReferenceControler } from '../controler/reference.controler';

import {loginControler} from '../controler/auth.controler'

router.post('/personalInfo', PersonalInfoControler.postPersonalInfo);
router.get('/personalInfo', PersonalInfoControler.getPersonalData);


router.post('/workingexperience', workingExperienceControler.postWorkingExperience);
router.get('/workingexperience', workingExperienceControler.getWorkingExperience);

router.post('/skil', skilControler.postSkil);
router.get('/skil', skilControler.getSkil);

router.post('/educations', educationControler.educationPost);
router.get('/educations', educationControler.getEducations);

router.post('/references', ReferenceControler.referencePost);
router.get('/references', ReferenceControler.getReference);


// login router

router.post('/signup', loginControler.postUser);
router.post('/login', loginControler.postlogin);
router.get('/login', loginControler.getLogin);
router.post('/refresToken', loginControler.refreshToken);
router.get('/logout', loginControler.logout);


// module.exports = router;




// export class Router  {

//     static router = express.Router();
 
//     public static getAllRoute (){
//         this.router.post('/personalInfo', PersonalInfoControler.postPersonalInfo);

//         return this.router;
//     } 
// }
