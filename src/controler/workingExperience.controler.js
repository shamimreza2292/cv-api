"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingExperienceControler = void 0;
const workingExperienceModal = require('../modal/workingExperience');
const dateFormat = require('../helper/dateFormeter');
const ObjectId = require('mongodb').ObjectID;
// es6 module
class workingExperienceControler {
    static postWorkingExperience(req, res, next) {
        const companyName = req.body.companyName;
        const exId = req.body.id;
        const designation = req.body.designation;
        const responsibilities = req.body.responsibilities;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const continuing = req.body.continuing;
        const user = req.userId;
        const workingExperienceData = new workingExperienceModal({
            experience: [{
                    companyName,
                    designation,
                    responsibilities,
                    startDate,
                    endDate,
                    continuing,
                }],
            user
        });
        workingExperienceModal.find({ user: ObjectId(user) }).then((userData) => {
            if (userData.length > 0) {
                const workingExperienceId = userData[0]._id;
                workingExperienceModal.findById(workingExperienceId).then((updateExperience) => {
                    if (exId) {
                        // updateExperience.experience
                        updateExperience.experience.map(exData => {
                            if (exData._id == exId) {
                                exData.companyName = companyName ? companyName : exData.companyName ? exData.companyName : null;
                                exData.designation = designation ? designation : exData.designation ? exData.designation : null;
                                exData.responsibilities = responsibilities ? responsibilities : exData.responsibilities ? exData.responsibilities : null;
                                exData.startDate = startDate ? startDate : exData.startDate ? exData.startDate : null;
                                exData.endDate = endDate ? endDate : exData.endDate ? exData.endDate : null;
                                exData.continuing = continuing ? continuing : exData.continuing ? exData.continuing : null;
                            }
                        });
                    }
                    else {
                        let experience = {
                            companyName,
                            designation,
                            responsibilities,
                            startDate,
                            endDate,
                            continuing,
                        };
                        updateExperience.experience.push(experience);
                    }
                    updateExperience.save().then(result => {
                        res.status(201).json({
                            message: 'update successfully.',
                            data: result
                        });
                    });
                });
            }
            else {
                workingExperienceData.save().then((result) => {
                    res.status(201).json({
                        message: "successfully psot working experience.",
                        data: result
                    });
                });
            }
        });
    }
    static getWorkingExperience(req, res, next) {
        let userid = req.userId;
        workingExperienceModal.find({ user: ObjectId(userid) }).then((userData) => {
            if (userData.length > 0) {
                const workExperienceId = userData[0]._id;
                workingExperienceModal.findById(workExperienceId).then((data) => {
                    res.status(201).json({
                        data
                    });
                });
            }
            else {
                res.status(201).json(null);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}
exports.workingExperienceControler = workingExperienceControler;
