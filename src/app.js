"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
// import bodyParser from 'body-parser';
// import { Router } from './router/routes'; // need to declear class and export it 
// const express = require('express');
// const mongoose = require('mongoose'); 
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
// import session from 'express-session';
// import { Session, SessionOptions } from 'express-session';
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const connect_mongodb_session_1 = tslib_1.__importDefault(require("connect-mongodb-session"));
const auth_controler_1 = require("./controler/auth.controler");
// const session = require('express-session');
const cors = require('cors');
const app = express_1.default();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const routes = require('./router/routes');
// const bodyParser = require('body-parser');
const port = process.env["PORT"] || 4000;
const connectMongoSessionStor = connect_mongodb_session_1.default(express_session_1.default);
const sessionStore = new connectMongoSessionStor({
    uri: 'mongodb+srv://max:ONU8Lh2p439Mq72e@cluster0.xxcpo.mongodb.net/myJobCarrier',
    collection: 'sessionstore'
});
// const session =  SessionOptions;
app.use(express_1.default.json());
app.use((req, res, next) => {
    req.userId = auth_controler_1.loginControler.userId;
    next();
});
app.use(cors({
    origin: ['https://shamimreza2292.github.io', 'http://localhost:4200', 'https://cvbackendapi.herokuapp.com'],
    optionsSuccessStatus: 200
}));
app.use(express_session_1.default({
    secret: 'cv session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: sessionStore
}));
app.use('/api', routes);
// ONU8Lh2p439Mq72e
mongoose_1.default.connect('mongodb+srv://max:ONU8Lh2p439Mq72e@cluster0.xxcpo.mongodb.net/easyStepResume?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    // db.createConnection('easyStepResume').then((colection)=>{
    // })
    app.listen(port, () => {
        console.log(`server use port ${port}`);
    });
}).catch((err) => {
    console.log('mongodb conection error');
    console.log(err);
});
