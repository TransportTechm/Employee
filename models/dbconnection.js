var mysql = require('mysql');

//start mysql connection
var mysql=require('mysql');
var connection=mysql.createPool({
host:'localhost',
user:'root',
password:'root',
database:'employee'
});
//end mysql connection

module.exports=connection;