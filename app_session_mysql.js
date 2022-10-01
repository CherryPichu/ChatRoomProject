// /https://jamong-icetea.tistory.com/143
/* require */
const express = require('express')
const session = require('express-session')
const MySQLStore = require("express-mysql-session")(session)
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();
/* 객체 생성 */
var app = express();

/** use  **/
app.use(session({
    secret  :  process.env.COOKIE_SECRET,
    resave : false,
    saveUninitialized : true,
    store : new MySQLStore({
        host : process.env.MYSQLHOST ,
        prot : 3306,
        user : process.env.MYSQLUSER,
        password : process.env.MYSQLPASSWORD,
        database : process.env.MYSQLDATABASE,
    })
}))

app.use(bodyParser.urlencoded({extended : false}))

