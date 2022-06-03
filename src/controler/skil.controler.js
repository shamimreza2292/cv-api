"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skilControler = void 0;
const skilModal = require('../modal/skil');
const ObjectId = require('mongodb').ObjectID;
class skilControler {
    static postSkil(req, res, next) {
        const skilName = req.body.skilName;
        const confidentLavel = req.body.confidentLavel;
        const skillId = req.body.id;
        const user = req.userId;
        const skilData = new skilModal({
            skills: [{
                    skilName,
                    confidentLavel,
                }],
            user
        });
        skilModal.find({ user: ObjectId(user) }).then((skillData) => {
            if (skillData.length > 0) {
                const skillCollectionId = skillData[0]._id;
                skilModal.findById(skillCollectionId).then((data) => {
                    if (skillId) {
                        data.skills.map((curentSkill) => {
                            if (curentSkill['_id'] == skillId) {
                                curentSkill.skilName = skilName ? skilName : curentSkill.skilName ? curentSkill.skilName : null;
                                curentSkill.confidentLavel = confidentLavel ? confidentLavel : curentSkill.confidentLavel ? curentSkill.confidentLavel : null;
                            }
                        });
                    }
                    else {
                        let skill = {
                            skilName,
                            confidentLavel,
                        };
                        data.skills.push(skill);
                    }
                    data.save().then((skil) => {
                        res.status(200).json({
                            message: "Successfully update skil.",
                            // skilData: skil
                        });
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                skilData.save().then((data) => {
                    res.status(201).json({
                        message: "Successfully post skil.",
                        // skilData: data
                    });
                }).catch((err) => {
                });
            }
        });
    }
    static getSkil(req, res, next) {
        let userid = req.userId;
        skilModal.find({ user: ObjectId(userid) }).then((skillData) => {
            if (skillData.length > 0) {
                const skillCollectionId = skillData[0]._id;
                skilModal.findById(skillCollectionId).then((data) => {
                    res.status(201).json({
                        data
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                res.status(201).json(null);
            }
        });
    }
}
exports.skilControler = skilControler;
