"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginControler = void 0;
const assert_1 = require("assert");
const rand_token_1 = require("rand-token");
const redis = require('redis');
const bcrypt = require('bcrypt');
const client = redis.createClient({
    port: 6379,
});
var jwt = require('jsonwebtoken');
// import user from '../modal/user'
const user = require('../modal/user');
const ACCESS_TOKEN_KEY = 'someSecterkey';
// const refreshTokens: refreshTokens = <refreshTokens>{};
const refreshTokens = {};
class loginControler {
    static postUser(req, res, next) {
        let email = req.body.email;
        user.findOne({ email: email }).then((matchUser) => {
            if (matchUser) {
                res.status(401);
                res.json({ message: 'you already sign up please login' });
                return;
            }
            // let password: any;
            bcrypt.hash(req.body.password, 10, (err, encryptedPass) => {
                let password = encryptedPass;
                const userSchema = new user({
                    email,
                    password
                });
                userSchema.save().then((data) => {
                    res.status(201).json({
                        message: 'successfully crate user'
                    });
                });
                // next()
            });
        });
    }
    static postlogin(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        // const userID = 2345;
        user.findOne({ email: email }).then((matchUser) => {
            if (!matchUser) {
                res.status(401);
                res.json({ message: 'email or password is incorrect' });
                return;
            }
            bcrypt.compare(password, matchUser.password, function (err, isPasswordMatch) {
                if (!isPasswordMatch) {
                    console.log('email or password is incorrect');
                    res.status(401);
                    res.json({ message: 'email or password is incorrect' });
                }
                else {
                    let user = {
                        email: matchUser.email,
                        id: matchUser.id
                        // role: admin
                    };
                    // const userId = matchUser.id;
                    loginControler.userId = matchUser.id;
                    let refreshToken = rand_token_1.uid(256);
                    refreshTokens[refreshToken] = email;
                    let expireTime = new Date().getTime() + (60 * 1000); // token expireation date need to re-check
                    // let expireTime =  60*1000; // 1min
                    let token = jwt.sign(user, ACCESS_TOKEN_KEY, { expiresIn: 60 });
                    // res.cookie('access_token', loginControler.userId, {
                    //     // httpOnly: true
                    // });
                    // res.cookie('refresh_token', refreshToken);
                    res.status(200).json({
                        // accessToken: token,
                        // referencehToken: refreshToken,
                        status: 200,
                        message: assert_1.ok,
                        user: user
                    });
                    client.set(loginControler.userId, token);
                    //const token = jwt.sign(user, ACCESS_TOKEN_KEY, {expiresIn: '10s'});
                    //cash email/username for using at refreshToken
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    static getLogin(req, res, next) {
        // token error handeling need to implement
        // const userID = '60f6298f637ef05cbe7bf3e8'; // req.cookies.access_token
        client.get(loginControler.userId, (err, data) => {
            jwt.verify(data, ACCESS_TOKEN_KEY, { ignoreExpiration: false }, (err, verifiedJwt) => {
                if (err) {
                    res.status(401);
                    res.json({
                        // accessToken: token,
                        message: 'Token Expired Error'
                        // referencehToken: refreshToken,
                    });
                }
                else {
                    res.status(200).json({
                        // accessToken: token,
                        message: 'successfull login get'
                        // referencehToken: refreshToken,
                    });
                }
            });
        });
    }
    static refreshToken(req, res, next) {
        // const userID =  req.cookies.access_token ; // req.cookies.access_token
        if (loginControler.userId) {
            client.get(loginControler.userId, (err, oldToken) => {
                jwt.verify(oldToken, ACCESS_TOKEN_KEY, { ignoreExpiration: false }, (err, payload) => {
                    if (err) {
                        res.status(401);
                        res.json('Unauthorized');
                    }
                    else {
                        if (payload) {
                            let user = {
                                email: payload.email,
                                id: payload.id
                            };
                            let refreshToken = rand_token_1.uid(256);
                            let newToken = jwt.sign(user, ACCESS_TOKEN_KEY, { expiresIn: 60 * 60 });
                            res.status(200).json({
                                status: 200,
                                message: assert_1.ok,
                                user: user
                            });
                            res.cookie('access_token', newToken, {
                                httpOnly: true
                            });
                            res.cookie('refresh_token', refreshToken);
                        }
                    }
                });
            });
        }
        else {
            res.status(500).json('server error');
        }
    }
    static logout(req, res, next) {
        // let userId = req.cookies.access_token;
        if (loginControler.userId) {
            client.del(loginControler.userId, (err, reply) => {
                if (err) {
                    res.status(500);
                    res.json({ message: 'client not get any key for deleting.' });
                }
                else {
                    // res.clearCookie('access_token');
                    // res.clearCookie('refresh_token');
                    loginControler.userId = null;
                    res.status(201);
                    res.json({
                        message: 'logout successfully'
                    });
                }
            });
        }
    }
}
exports.loginControler = loginControler;
loginControler.userId = null;
