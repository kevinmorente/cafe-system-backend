const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
let ejs = require('ejs');
let pdf = require('pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');

