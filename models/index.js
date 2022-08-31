const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();

const connect = mysql.createConnection({
    host : process.env.MYSQLHOST,
    user : process.env.MYSQLUSER,
    database : process.env.MYSQLDATABASE,
    password : process.env.MYSQLPASSWORD,
})


const db = {
    PrintClient : () => {
        connect.query(
            'SELECT * FROM `client`',
            function(err, results, fields){
                console.log(results)
                // console.log(fields)
            }
        )
    }
}


module.exports = db