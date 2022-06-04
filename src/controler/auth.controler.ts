
import { ok } from 'assert';
import { Request, Response, NextFunction } from 'express';
import { uid, suid } from 'rand-token';
import { userInfo } from '../interfaces/user';

const redis =  require('redis');
const bcrypt = require('bcrypt');
const client = redis.createClient({
    port: 6379,
  });
var jwt = require('jsonwebtoken');


// import user from '../modal/user'
 const user =  require('../modal/user');
const ACCESS_TOKEN_KEY = 'someSecterkey';


export interface refreshTokens {
    refreshToken: string;
    // age: number;
  }

// const refreshTokens: refreshTokens = <refreshTokens>{};
const refreshTokens: { [key: string]: any[] }  =  {};



export class loginControler {

    static userId: string | null = null ;




    public static postUser(req: any, res: Response, next: NextFunction){
        let email = req.body.email;
        user.findOne({email: email}).then((matchUser: any) =>{
            if(matchUser){ 
                res.status(401);
                res.json({message: 'you already sign up please login'});
                return;
            } 
            // let password: any;
            bcrypt.hash(req.body.password, 10, (err:any, encryptedPass:any) => {
                let password = encryptedPass;
                const userSchema: userInfo = new user({
                    email, 
                    password
                });
                userSchema.save().then((data: userInfo)=>{

                    res.status(201).json({
                        message: 'successfully crate user'
                    })
                }) 
                // next()
            })

            

           
        })
    }

    public static postlogin(req: any, res: Response, next: NextFunction){
        let email = req.body.email;
        let password = req.body.password;
        // const userID = 2345;
        user.findOne({email: email}).then((matchUser: any) =>{
            if(!matchUser){
                res.status(401);
                res.json({message: 'email or password is incorrect'});
                return;
            } 

            bcrypt.compare(password, matchUser.password, function(err: any, isPasswordMatch:any) {   
                if(!isPasswordMatch) {
                    console.log('email or password is incorrect');
                    res.status(401);
                    res.json({message: 'email or password is incorrect'});
                }else{
                        let user = {
                            email: matchUser.email,
                            id: matchUser.id
                            // role: admin
                        }
                        // const userId = matchUser.id;
                        loginControler.userId = matchUser.id
                        let refreshToken = uid(256);
                        refreshTokens[refreshToken] =  email; 
    
                        let expireTime = new Date().getTime() + (60*1000); // token expireation date need to re-check
                        // let expireTime =  60*1000; // 1min
                        let token = jwt.sign(user, ACCESS_TOKEN_KEY, {expiresIn: 60});
    
                            // res.cookie('access_token', loginControler.userId, {
                            //     // httpOnly: true
                            // });
                            // res.cookie('refresh_token', refreshToken);
    
                            res.status(200).json({
                                // accessToken: token,
                                // referencehToken: refreshToken,
                                status: 200,
                                message: ok,
                                user: user
                            })
                             client.set(loginControler.userId,  token);
                    //const token = jwt.sign(user, ACCESS_TOKEN_KEY, {expiresIn: '10s'});
                    //cash email/username for using at refreshToken
                }
            });


            
        }).catch((err: any)=>{
            console.log(err);
        })
    } 


    public static getLogin(req: any, res: Response, next: NextFunction){
        // token error handeling need to implement
        // const userID = '60f6298f637ef05cbe7bf3e8'; // req.cookies.access_token
        client.get(loginControler.userId , (err: any, data: any)=>{
            jwt.verify(data, ACCESS_TOKEN_KEY, {ignoreExpiration: false}, (err: any, verifiedJwt: any)=>{
                if(err){
                    res.status(401);
                    res.json({ 
                        // accessToken: token,
                        message: 'Token Expired Error'
                        // referencehToken: refreshToken,
                     })
                }else{
                    res.status(200).json({ 
                        // accessToken: token,
                        message: 'successfull login get'
                        // referencehToken: refreshToken,
                     })
                }
                
            } );
        })
    }



    public static refreshToken(req: Request, res: Response, next: NextFunction ){
            // const userID =  req.cookies.access_token ; // req.cookies.access_token

            if(loginControler.userId){
                client.get(loginControler.userId, (err: any, oldToken: any)=>{
                    jwt.verify(oldToken, ACCESS_TOKEN_KEY, {ignoreExpiration: false}, (err: any, payload: any)=>{
                        if(err){
                            res.status(401);
                            res.json('Unauthorized')
                        }else{
                            if(payload){
                                let user = {
                                    email: payload.email,
                                    id: payload.id
                                }
            
                                let refreshToken = uid(256);        
                                let newToken = jwt.sign(user, ACCESS_TOKEN_KEY, {expiresIn: 60*60});
                                res.status(200).json({
                                    status: 200,
                                    message: ok,
                                    user: user
                                 });
            
                                 res.cookie('access_token', newToken, {
                                    httpOnly: true
                                 });
                                 res.cookie('refresh_token', refreshToken);
                                
                            }
                        }
                    });
                })
            }else{
                res.status(500).json('server error')
            }
            
         
    }


    public static logout(req: Request, res: any, next: any){
        // let userId = req.cookies.access_token;

        if(loginControler.userId){
            client.del(loginControler.userId, (err: any, reply: any)=>{
                if(err){
                    res.status(500);
                    res.json({message: 'client not get any key for deleting.'})
                }else{
                    // res.clearCookie('access_token');
                    // res.clearCookie('refresh_token');
                    loginControler.userId = null
                    res.status(201);                                                                                                                                                                                            
                    res.json({
                        message: 'logout successfully'
                    })
                }
            });
        }
       
    }
    

}

