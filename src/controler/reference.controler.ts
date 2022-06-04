
// import {educationInfo} from "../interfaces/educationInfo";
import {RefarenceInfo} from '../interfaces/referenceInfo'
import { Request, Response, NextFunction } from 'express';

const referenceModal = require('../modal/reference');
const ObjectId = require('mongodb').ObjectID;

export class ReferenceControler {
    public static referencePost(req: any, res: Response, next: NextFunction) {
        const name = req.body.name;
        const designation = req.body.designation;
        const organizationName = req.body.organizationName;
        const refId = req.body.id;
        const user = req.userId;
    
        const referenceData: RefarenceInfo = new referenceModal({
            references:  [{
                name,
                designation,
                organizationName,
            }],
            user
        });

        referenceModal.find({user: ObjectId(user)}).then((refData: any)=>{
            if(refData.length > 0){
                const referenceId = refData[0]._id;
                referenceModal.findById(referenceId).then((referData: RefarenceInfo)=>{
                    if(refId){
                        referData.references.map(refarenceInfoData=>{
                            if(refarenceInfoData._id == refId){
                                refarenceInfoData.name = name;
                                refarenceInfoData.designation = designation;
                                refarenceInfoData.organizationName = organizationName;
                            } 
                        })
                    }else{
                        let refObj = {
                            name,
                            designation,
                            organizationName 
                        }
                        referData.references.push(refObj);
                    }
                    referData.save().then((data: any)=>{
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
                referenceData.save().then((data: RefarenceInfo) =>{
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

        // start work from here

    public static getReference (req: any, res: Response, next: NextFunction) {
        let userid = req.userId;
        referenceModal.find({user: ObjectId(userid)}).then((refData:any)=>{
            if(refData.length > 0){
                const referenceId = refData[0]._id;
                referenceModal.findById(referenceId).then((data: RefarenceInfo)=>{
                    res.status(201).json({
                        // message: "get data successfully",
                        data
                    })
                
                })
            
            }else{
                res.status(201).json(null)
            }

        
        })

    }


}

