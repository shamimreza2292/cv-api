import express from 'express';
// import bodyParser from 'body-parser';
 
// import { Router } from './router/routes'; // need to declear class and export it 

// const express = require('express');
 
// const mongoose = require('mongoose'); 

import mongoose from 'mongoose';

// import session from 'express-session';

// import { Session, SessionOptions } from 'express-session';
import session from 'express-session';

import connectMongodbSession from 'connect-mongodb-session';

import {loginControler} from './controler/auth.controler';
import { nextTick } from 'process';

// const session = require('express-session');

const cors = require('cors')

const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const routes = require('./router/routes');
// const bodyParser = require('body-parser');


const port = process.env["PORT"] || 4000;

const connectMongoSessionStor = connectMongodbSession(session)
const sessionStore = new connectMongoSessionStor({
    uri: 'mongodb+srv://max:ONU8Lh2p439Mq72e@cluster0.xxcpo.mongodb.net/myJobCarrier',
    collection: 'sessionstore'  
})
// const session =  SessionOptions;

app.use(express.json());

app.use((req:any, res:any, next: any)=>{
    req.userId = loginControler.userId;
  next();   
})

app.use(cors({
    origin: ['https://shamimreza2292.github.io/easyStepCV', 'http://localhost:4200'],
    optionsSuccessStatus: 200 
})); 

app.use(session({
    secret: 'cv session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: sessionStore
}));






app.use('/api', routes);




// ONU8Lh2p439Mq72e

 mongoose.connect('mongodb+srv://max:ONU8Lh2p439Mq72e@cluster0.xxcpo.mongodb.net/easyStepResume?retryWrites=true&w=majority', {
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db)=>{

    // db.createConnection('easyStepResume').then((colection)=>{

    // })
    app.listen(port, ()=>{
        console.log(`server use port ${port}`);
    });
    
}).catch((err: any)=>{
    console.log('mongodb conection error');
    console.log(err);
});
