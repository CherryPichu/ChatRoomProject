const sql = require('./db.config.js')
const app = require('express/')
/**
 * @swagger
 *  components :
 *  schemas :
 *   Room : 
 *      properties :
 *       title :
 *          type : varchar(20)
 *       inPeople :
 *          type : int(11)
 *          default : 0
 *       state :
 *          type : varchar(50)
 *          default : Public
 *          Value : Public / Secret
 *       max :
 *          type : int(11)
 *       owner :
 *          type : int(11)
 *       password : 
 *          type : varchar(30)
 *       createAt :
 *          type : DATETIME
 *          default : current_TIMESTAMP()
 *        
 */  

//  const newRoom = new Roomdb({
//     title : ,
//     inPeople : ,
//     max : ,
//     owner : ,
//     password : ,
//     state : ,
// });

const Room = function (room) {
    this.title = room.title;
    this.inPeople = room.inPeople
    this.max = room.max;
    this.owner = room.owner;
    this.password = room.password;
    this.state = room.state;
}



MakeWhereWord = (objdb) => {
    query = " WHERE "
    let cnt = 0;
    for(const id in objdb ){ // 객체의 propery 를 모두 뱉어냄. ()
        

        if(objdb[id] != null){
            if(cnt == 0 ) { // 첫번째는 AND 를 안붙임.
                cnt += 1;
                query += '`'+id + '`' + " = " +'"'+ objdb[id]+ '"'; // curl + shift + L : 같은 단어 드래그
            }else{
                query += " AND "+ '`'+id + '`' + " = " + '"'+objdb[id] + '"';
            }
            

        }
            
    }
    return query
}



Room.create = (newRoom, result) => {
    sql.query('insert into Room SET ? ', newRoom, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        result(null, res)
        // console.log("Created Room: ", {id : res.insertId, email : res.email, newRoom})
    })

}


/*
{
  title: 'namjung',
  inPeople: 0,
  max: 12,
  owner: 178,
  password: '1234',
  createAt: 2022-10-08T18:04:08.000Z,
  state: 'Public'
}
*/
Room.findByRoom = (byRoom, result) => {
    let query = "SELECT * FROM Room "
    query += MakeWhereWord(byRoom)
    sql.query(query ,(err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if(res.length) {
            // console.log("found chat : ", res[0])
            result(null, res[0])
            return;
        }
        
        result({kind : "not_found"}, null);
    })

}

Room.loadInPeoPle = () => { // inPeople을 갱신해줌
    // Room.getAll(res.);
    
    // Room.findByRoom()
}

Room.getAll = (result) => {
    sql.query("SELECT * FROM Room", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })

}
Room.getAllNotDeleted = (result) => {
    sql.query("SELECT * FROM Room Where deletedAt is null", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }
        result(null, res)
    })

}

Room.updateByTitle = (title, newRoom, result) => {

    
    sql.query("UPDATE Room SET ? WHERE title = ?", [newRoom, title],
        (err, res) => {
            if(err){
                console.log("error : ", err)
                result(err, null)
            }
            if(res.affectedRows == 0){
                result({kind : "not_found"}, null);
            }

            // console.log("update Room : ", {id :id, chat})
            console.log(res)
            result(null, res)
    })
}
Room.remove2 = (title, result) => {

    sql.query("UPDATE Room SET deletedAt = now() WHERE title = ?", [title],
        (err, res) => {
            if(err){
                console.log("error : ", err)
                result(err, null)
            }
            if(res.affectedRows == 0){
                result({kind : "not_found"}, null);
            }

            // console.log("update Room : ", {id :id, chat})
            // console.log(res)
            result(null, res)
    })
}

Room.remove = (byRoom, result) => {

    let query = "DELETE FROM Room "
    query += MakeWhereWord(byRoom)
    sql.query(query,  (err, res) => {
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
}

module.exports = Room




