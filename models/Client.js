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

// Client.prototype.getClient =  ()  => {
    
//     return { // id: id, email : email 으로 js가 자동으로 붙여줌.
//         id,email,password,nick,colorHash,snsid,deletedAt,
//     }
// }

Client.end = sql.end; // 왜 만들었지... 기억 안남..
/* 참고
https://1-day-1-coding.tistory.com/51
CURD MODEL 만들기
 
*/

MakeWhereWord = (byclient) => {
    query = " WHERE "
    let cnt = 0;
    for(const id in byclient ){
        

        if(byclient[id] != null){
            if(cnt == 0 ) { // 첫번째는 AND 를 안붙임.
                cnt += 1;
                query += '`'+id + '`' + " = " +'"'+ byclient[id]+ '"';
            }else{
                query += " AND "+ '`'+id + '`' + " = " + '"'+byclient[id] + '"';
            }
            

        }
            
    }
    return query
}
Client.create  = (newClient, result) =>{
    sql.query('insert into Client SET ? ', newClient, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }

        result(null, res)
        // console.log("Created Client : ", {id : res.insertId, email : res.email, newClient})
    })
}

Client.findByClient = (byclient, result) => {
    
    let query = "SELECT * FROM Client ";
    query = query + MakeWhereWord(byclient) // Where 문을 조립
    // console.log(query) // 
    sql.query(query, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null , res[0]) // 찾은 유저 정보만 던져줌.
    })
    

}


Client.getAll = (result) => {
    
    sql.query("SELECT * FROM Client" , ((err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null, res)
    }))
    return 200;
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

            // console.log("update Client : ", {id :id, client})
            // result.null, {id: id, client}
            result(null, res)
        })
        return 200;
    }


Client.remove = (byclient, result) =>  {
    // sql.query('UPDATE client SET deletedAt = now() WHERE id = ?', id, (err, res) => {
        // console.log(byclient)
    let query = "UPDATE Client SET deletedAt = now() "
    query = query + MakeWhereWord(byclient)
    // console.log(query)
    sql.query(query, (err, res) => {
            if(err){
                console.log("error : ", err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0){
                result({kind:"not_found"}, null)
                return;
            }
            // console.log("deleted client :  : ", byclient);
            result(null, res);
    })
}

/*
You have tried to call .then(), .catch(), or invoked await on the result of query that is not a promise, which is a programming error. Try calling con.promise().query(), or require('mysql2/promise') instead of 'mysql2' for a promise-compatible version of the query interface. To learn how to use async/await or Promises check out documentation at https://www.npmjs.com/package/mysql2#using-promise-wrapper, or the mysql2 documentation at https://github.com/sidorares/node-mysql2/tree/master/documentation/Promise-Wrapper.md
*/


module.exports = Client;


