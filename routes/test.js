const express = require('express');
const router = express.Router();
const sql=require('mysql');
var db=require('../connection');
const EventEmmiter =require('events');
const { Console } = require('console');
const event =new EventEmmiter();


var meme = require('./login');

console.log(meme);