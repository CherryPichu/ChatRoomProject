const sql = require('./db.js')

const Client = function (client) { // 생성자
    this.id = null;
    this.email = client.email;
    this.password = client.password;
    this.nick = client.nick;
    this.colorHash = client.colorHash;
    this.snsid = client.snsid;
    this.deletedAt = client.deletedAt;
    // this.createAt = client.createAt;
    // this.updatedAt = client.updatedAt;
}

/* 참고
https://1-day-1-coding.tistory.com/51
CURD MODEL 만들기
 
*/
Client.create  = (newClient, result) =>{
    sql.query('insert into client SET ? ', newClient, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        console.log("Created Client : ", {id : res.insertId, email : res.email, newClient})
    })
}


Client.findByID = (clientID, result) => {
    sql.query("SELECT * FROM Client Where id = ?", clientID, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if(res.length) {
            console.log("found client : ", res[0])
            result(null, res[0])
            return;
        }
        
        result({kind : "not_found"}, null);
    })
}


Client.getAll = result => {
    sql.query("SELECT * FROM client", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }

        console.log("client : ", res);
        result(null, res)
    })
}

Client.updateByID = (id, client, result) => {
    sql.query("UPDATE client SET email = ?, password = ?, nick = ?, colorHash = ?, snsid = ?, deletedAt = ?, createAt = ?, updateAt = ? WHERE id = ?",
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

            console.log("update client : ", {id :id, client})
            result.null, {id: id, client}
        })
    }


Client.remove = (id, result) => {
    sql.query('UPDATE client deletedAt WHERE id = ?', id, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind:"not_found"}, null)
            return;
        }
        console.log("deleted cutomer with id : ", id);
        result(null, res);
    })
}

module.exports = Client;


