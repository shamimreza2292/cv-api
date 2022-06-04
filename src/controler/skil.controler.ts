const skilModal = require('../modal/skil');

import {Request, Response, NextFunction} from 'express';
import { skilInfo } from '../interfaces/skilinfo';
const ObjectId = require('mongodb').ObjectID;


export class skilControler {

    public static postSkil (req: any, res: Response, next: NextFunction) {
        const skilName = req.body.skilName;
        const confidentLavel = req.body.confidentLavel;
        const skillId = req.body.id;
        const user = req.userId;
        const skilData: skilInfo = new skilModal({
            skills: [{
                skilName,
                confidentLavel,
            }],           
            user
        });

        skilModal.find({user: ObjectId(user)}).then((skillData: any)=>{
            if(skillData.length > 0){
                const skillCollectionId = skillData[0]._id;
                    skilModal.findById(skillCollectionId).then((data: skilInfo)=>{
                        if(skillId){
                            data.skills.map((curentSkill)=>{
                                if(curentSkill['_id'] == skillId){
                                    curentSkill.skilName = skilName ? skilName : curentSkill.skilName ? curentSkill.skilName : null;
                                    curentSkill.confidentLavel = confidentLavel ? confidentLavel : curentSkill.confidentLavel ? curentSkill.confidentLavel : null;    
                                }                                
                            })
                        }else{
                            let skill = {
                                skilName,
                                confidentLavel,
                            }
                            data.skills.push(skill);
                        }
                        data.save().then((skil: skilInfo)=>{
                            res.status(200).json({
                                message: "Successfully update skil.",
                                // skilData: skil
                            })
                        }) 
        
                    }).catch((err: any)=>{
                        console.log(err);
                        
                    })
            }else{
                skilData.save().then((data: skilInfo) =>{
                    res.status(201).json({
                        message: "Successfully post skil.",
                        // skilData: data
                    })
                }).catch((err:any)=>{
            
                });
            }
        });
        
    }


    public static getSkil (req: any, res: Response, next: NextFunction) {
        let userid = req.userId;
        skilModal.find({user: ObjectId(userid)}).then((skillData:any)=>{
            if(skillData.length > 0){
                const skillCollectionId = skillData[0]._id;
                skilModal.findById(skillCollectionId).then((data: skilInfo)=>{
                    res.status(201).json({
                        data
                    })
                }).catch((err:any)=>{
                    console.log(err);
                })
            }else{
                res.status(201).json(null)
            }
        })

       
    }





}

