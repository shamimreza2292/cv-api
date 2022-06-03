"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationControler = void 0;
const educationModal = require('../modal/education');
const ObjectId = require('mongodb').ObjectID;
class educationControler {
    static educationPost(req, res, next) {
        const passingYear = req.body.passingYear;
        const nameOfDegree = req.body.nameOfDegree;
        const nameOfInstitute = req.body.nameOfInstitute;
        const eduId = req.body.id;
        const user = req.userId;
        const educationData = new educationModal({
            educations: [{
                    passingYear,
                    nameOfDegree,
                    nameOfInstitute,
                }],
            user
        });
        educationModal.find({ user: ObjectId(user) }).then((eduData) => {
            if (eduData.length > 0) {
                const eduCollectionId = eduData[0]._id;
                educationModal.findById(eduCollectionId).then((eduData) => {
                    if (eduId) {
                        eduData.educations.map(education => {
                            if (education._id == eduId) {
                                education.nameOfDegree = nameOfDegree;
                                education.nameOfInstitute = nameOfInstitute;
                                education.passingYear = passingYear;
                            }
                        });
                    }
                    else {
                        let edu = {
                            passingYear,
                            nameOfDegree,
                            nameOfInstitute
                        };
                        eduData.educations.push(edu);
                    }
                    eduData.save().then((data) => {
                        res.status(201).json({
                            // message: 'update successfuly',
                            data
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                educationData.save().then((data) => {
                    res.status(201).json({
                        // message: "education data successfully save",
                        data
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    static getEducations(req, res, next) {
        let userid = req.userId;
        educationModal.find({ user: ObjectId(userid) }).then((eduData) => {
            if (eduData.length > 0) {
                const eduCollectionId = eduData[0]._id;
                educationModal.findById(eduCollectionId).then((data) => {
                    res.status(201).json({
                        // message: "get data successfully",
                        data
                    });
                });
            }
            else {
                res.status(201).json(null);
            }
        });
        // educationModal.find().then((eduData: educationInfo)=>{
        //     res.status(201).json({
        //         message: "get data successfully",
        //         data: eduData
        //     })
        // }).catch((err: Error)=>{
        //     console.log(err);
        // })
    }
}
exports.educationControler = educationControler;
