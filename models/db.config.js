const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
// https://1-day-1-coding.tistory.com/51 참고
const connect = mysql.createConnection({
    host : process.env.MYSQLHOST,
    user : process.env.MYSQLUSER,
    database : process.env.MYSQLDATABASE,
    password : process.env.MYSQLPASSWORD,
})


connect.connect(error => {
    if(error) throw error;
    // console.log("Successfully connected to the database")
})

module.exports = connect;
