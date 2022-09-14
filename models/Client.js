const sql = require('./db.config.js')


// 참고 : 
// https://velog.io/@godkor200/%EA%B7%80%EC%B0%AE%EC%9D%80-api-%EB%AC%B8%EC%84%9C-swagger-UI%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94
/**
 * @swagger
 *  components :
 *  schemas :
 *   Client : 
 *      properties :
 *       id :
 *          type : int(11)
 *       email :
 *          type : varchar(40)
 *       password : 
 *          type : varchar(40)
 *       nick :
 *          type : varchar(20) 
 *       colorHash :
 *          type : varchar(100)
 *          default : NULL
 *       snsId :
 *          type : varchar(30)
 *          default : NULL
 *       createAt :
 *          type : DATETIME
 *          default : CURRENT_TIMESTAMP
 *       updatedat : 
 *          type : DATETIME
 *          default : CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 *       deletedAt :
 *          type : DATETIME
 *          default : NULL
 *          
 *  */

const Client = function (client) { // 생성자
        this.id = client.id;
        this.email = client.email;
        this.password = client.password;
        this.nick = client.nick;
        this.colorHash = client.colorHash;
        this.snsid = client.snsid;
        this.deletedAt = client.deletedAt;
    // this.createAt = client.createAt;
    // this.updatedAt = client.updatedAt;
}
Client.end = sql.end;
/* 참고
https://1-day-1-coding.tistory.com/51
CURD MODEL 만들기
 
*/
Client.create  = (newClient, result) =>{
    sql.query('insert into Client SET ? ', newClient, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        // console.log("Created Client : ", {id : res.insertId, email : res.email, newClient})
    })
    return 200;
}


Client.findByIdandPassword = (byclient, result) => {

    sql.query("SELECT * FROM Client Where email = ? AND password = ?", 
        [byclient.email, byclient.password],(err, res) =>{
            if(err){
                console.log('error : ', err);
                result(err, null)
            }else{
                result(null, res)
            }
        })
    return 200;
}


// 09-12 
Client.getAll = async () => {
    
    try{
        return await sql.promise().query("SELECT * FROM Client")
    }catch(err){
        console.err(err)
        return 500;
    }
    // .catch((err, res) => {
    //     if(err){
    //         console.log("error : ", err);
    //         result(err, null)
    //         return;
    //     }
    //     result(null, res)
    // })
}

Client.updateByID = (id, client, result) => {
    sql.query("UPDATE Client SET email = ?, password = ?, nick = ?, colorHash = ?, snsid = ?, deletedAt = ?, createAt = ?, updateAt = ? WHERE id = ?",
    [client.enail, client.password , client.nick , client.colorHash, client.snsid, 
        client.deletedAt, client.createAt, client.updateAt ,client.id],
        (err, res) => {
            if(err){
                console.log("error : ", err)
                result(err, null)
                return;
            }
            if(res.affectedRows == 0){
                result({kind : "not_found"}, null);
                return;
            }

            console.log("update Client : ", {id :id, client})
            result.null, {id: id, client}
        })
        return 200;
    }


Client.remove = async (byemail, result) =>  {
    // sql.query('UPDATE client SET deletedAt = now() WHERE id = ?', id, (err, res) => {
        // console.log(byclient)
    let res = ''
    try{
        res = await sql.promise().query('DELETE FROM Client WHERE email = ?', [byemail], (err, res) => {
            if(err){
                console.log("error : ", err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0){
                result({kind:"not_found"}, null)
                return;
            }
            // console.log("deleted cutomer with email : ", byemail);
            result(null, res);
        })
    }catch(err){
        console.log("error : ", err)
        return 500;
    }
    console.log(res[0].affectedRows)
    if (res[0].affectedRows > 0)
        return 200;
    else{
        return 500;
    }
        

/*
You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(), or require('mysql2/promise') instead of 'mysql2' for a promise-compatible version of the query interface. To learn how to use async/await or Promises check out documentation at https://www.npmjs.com/package/mysql2#using-promise-wrapper, or the mysql2 documentation at https://github.com/sidorares/node-mysql2/tree/master/documentation/Promise-Wrapper.md
*/
}


module.exports = Client;


