
import {educationInfo} from "../interfaces/educationInfo";
import { Request, Response, NextFunction } from 'express';

const educationModal = require('../modal/education');
const ObjectId = require('mongodb').ObjectID;

export class educationControler {
    public static educationPost(req: any, res: Response, next: NextFunction) {
        const passingYear = req.body.passingYear;
        const nameOfDegree = req.body.nameOfDegree;
        const nameOfInstitute = req.body.nameOfInstitute;
        const eduId = req.body.id;
        const user = req.userId;
    
        const educationData: educationInfo = new educationModal({
            educations:  [{
                passingYear,
                nameOfDegree,
                nameOfInstitute,
            }],
            user
        });


        educationModal.find({user: ObjectId(user)}).then((eduData: any)=>{
            if(eduData.length > 0){
                const eduCollectionId = eduData[0]._id;
                educationModal.findById(eduCollectionId).then((eduData: educationInfo)=>{
                    if(eduId){
                        eduData.educations.map(education=>{
                            if(education._id == eduId){
                                education.nameOfDegree = nameOfDegree;
                                education.nameOfInstitute = nameOfInstitute;
                                education.passingYear = passingYear;
                            } 
                        })
                    }else{
                        let edu = {
                            passingYear,
                            nameOfDegree,
                            nameOfInstitute 
                        }
                        eduData.educations.push(edu);
                    }
                    eduData.save().then((data: any)=>{
                        res.status(201).json({
                            // message: 'update successfuly',
                            data
                        })
                    }).catch((err: any)=>{
                        console.log(err);
                        
                    })
                }).catch((err: any)=>{
                    console.log(err);
                    
                })

            }else{
                educationData.save().then((data: educationInfo) =>{
                    res.status(201).json({
                        // message: "education data successfully save",
                        data
                    })
                }).catch((err: Error) =>{
                    console.log(err);
                });
            }


        })
       
    }


    public static getEducations (req: any, res: Response, next: NextFunction) {
        let userid = req.userId;
        educationModal.find({user: ObjectId(userid)}).then((eduData:any)=>{
            if(eduData.length > 0){
                const eduCollectionId = eduData[0]._id;
                educationModal.findById(eduCollectionId).then((data: educationInfo)=>{
                    res.status(201).json({
                        // message: "get data successfully",
                        data
                    })
                
                })
            
            }else{
                res.status(201).json(null)
            }

        
        })


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

