"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceControler = void 0;
const referenceModal = require('../modal/reference');
const ObjectId = require('mongodb').ObjectID;
class ReferenceControler {
    static referencePost(req, res, next) {
        const name = req.body.name;
        const designation = req.body.designation;
        const organizationName = req.body.organizationName;
        const refId = req.body.id;
        const user = req.userId;
        const referenceData = new referenceModal({
            references: [{
                    name,
                    designation,
                    organizationName,
                }],
            user
        });
        referenceModal.find({ user: ObjectId(user) }).then((refData) => {
            if (refData.length > 0) {
                const referenceId = refData[0]._id;
                referenceModal.findById(referenceId).then((referData) => {
                    if (refId) {
                        referData.references.map(refarenceInfoData => {
                            if (refarenceInfoData._id == refId) {
                                refarenceInfoData.name = name;
                                refarenceInfoData.designation = designation;
                                refarenceInfoData.organizationName = organizationName;
                            }
                        });
                    }
                    else {
                        let refObj = {
                            name,
                            designation,
                            organizationName
                        };
                        referData.references.push(refObj);
                    }
                    referData.save().then((data) => {
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
                referenceData.save().then((data) => {
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
    // start work from here
    static getReference(req, res, next) {
        let userid = req.userId;
        referenceModal.find({ user: ObjectId(userid) }).then((refData) => {
            if (refData.length > 0) {
                const referenceId = refData[0]._id;
                referenceModal.findById(referenceId).then((data) => {
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
    }
}
exports.ReferenceControler = ReferenceControler;
