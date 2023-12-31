import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
// const cors = require('cors');
// const knex = require('knex');

import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfileGet} from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

// const register = require('./controllers/register');
// const signin = require('./controllers/signin');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');
    
const db = knex({
    client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
      // host: '127.0.0.1',
      // port: 5432,
      // user: 'postgres',
      // password: 'test',
      // database: 'face-block',
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
    });


const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {res.send(db.users)} )

app.post('/signin', handleSignin(db, bcrypt) )
app.post('/register', (req, res) =>{ handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) =>{ handleProfileGet(req, res, db) })
app.put('/image', (req, res) =>{ handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleApiCall(req, res) })


const PORT = 3000;
app.listen(3000, () => { console.log('app is running on port 3000'); })

