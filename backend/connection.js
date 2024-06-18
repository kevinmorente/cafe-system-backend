const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port: port,
})