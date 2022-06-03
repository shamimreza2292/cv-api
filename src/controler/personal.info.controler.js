"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalInfoControler = void 0;
const personalInfoModal = require('../modal/personal.info');
const ObjectId = require('mongodb').ObjectID;
class PersonalInfoControler {
    static postPersonalInfo(req, res, next) {
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        const objective = req.body.objective;
        const email = req.body.email;
        const address = req.body.address;
        const socialLink = req.body.socialLink;
        const designation = req.body.designation;
        const profileImage = req.body.profileImage;
        const fatherName = req.body.fatherName;
        const motherName = req.body.motherName;
        const dateOfBirth = req.body.dateOfBirth;
        const gender = req.body.gender;
        const maritalStatus = req.body.maritalStatus;
        const nationality = req.body.nationality;
        const religion = req.body.religion;
        const currentLocation = req.body.currentLocation;
        const user = req.userId;
        const personalInfoData = new personalInfoModal({
            name,
            phoneNumber,
            objective,
            email,
            address,
            socialLink,
            designation,
            profileImage,
            fatherName,
            motherName,
            dateOfBirth,
            gender,
            maritalStatus,
            nationality,
            religion,
            currentLocation,
            user,
        });
        personalInfoModal.find({ user: ObjectId(user) })
            .then((info) => {
            // find not working with reference id of user
            if (info.length > 0) {
                let personalInfoId = info[0]._id;
                personalInfoModal.findById(personalInfoId).then((data) => {
                    data.name = name ? name : data.name ? data.name : null;
                    data.phoneNumber = phoneNumber ? phoneNumber : data.phoneNumber ? data.phoneNumber : null;
                    data.objective = objective ? objective : data.objective ? data.objective : null;
                    data.email = email ? email : data.email ? data.email : null;
                    data.address = address ? address : data.address ? data.address : null;
                    data.socialLink = socialLink ? socialLink : data.socialLink ? data.socialLink : null;
                    data.designation = designation ? designation : data.designation ? data.designation : null;
                    data.profileImage = profileImage ? profileImage : data.profileImage ? data.profileImage : null;
                    data.fatherName = fatherName ? fatherName : data.fatherName ? data.fatherName : null;
                    data.motherName = motherName ? motherName : data.motherName ? data.motherName : null;
                    data.dateOfBirth = dateOfBirth ? dateOfBirth : data.dateOfBirth ? data.dateOfBirth : null;
                    data.gender = gender ? gender : data.gender ? data.gender : null;
                    data.maritalStatus = maritalStatus ? maritalStatus : data.maritalStatus ? data.maritalStatus : null;
                    data.nationality = nationality ? nationality : data.nationality ? data.nationality : null;
                    data.religion = religion ? religion : data.religion ? data.religion : null;
                    data.currentLocation = currentLocation ? currentLocation : data.currentLocation ? data.currentLocation : null;
                    data.user = user;
                    data.save().then((saveData) => {
                        res.status(201).json({
                            message: "successfully update",
                            data: saveData
                        });
                    });
                });
            }
            else {
                personalInfoData.save().then((result) => {
                    res.status(201).json({
                        message: "successfully post",
                        data: result
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
    static getPersonalData(req, res, next) {
        let userid = req.userId;
        personalInfoModal.find({ user: ObjectId(userid) }).then((infoData) => {
            if (infoData.length > 0) {
                let personalInfoId = infoData[0]._id;
                personalInfoModal.findById(personalInfoId).then((data) => {
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
exports.PersonalInfoControler = PersonalInfoControler;
