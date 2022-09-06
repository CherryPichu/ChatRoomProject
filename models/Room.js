const sql = require('./db.config.js')

/**
 * @swagger
 *  components :
 *  schemas :
 *   Room : 
 *      properties :
 *       title :
 *          type : varchar(20)
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

const Room = function (room) {
    this.title = room.title;
    this.max = room.max;
    this.owner = room.owner;
    this.password = room.password;
}




Room.create = (newRoom, result) => {
    sql.query('insert into Room SET ? ', newRoom, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        // console.log("Created Room: ", {id : res.insertId, email : res.email, newRoom})
    })
    return 200;
}



Room.findByTitle = (roomtitle, result) => {
    sql.query("SELECT * FROM Room Where title = ?", [roomtitle], (err,res) => {
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
    return 200;
}

Room.getAll = result => {
    sql.query("SELECT * FROM Room", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }

        // console.log("Room : ", res);
        result(null, res)
    })
    return 200;
}


Room.updateByTitle = (title, room, result) => {

    // id : 
    // chat : chat 객체를 던져줌
    sql.query("UPDATE Room SET ? WHERE title = ?", [room, title],
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

            // console.log("update Room : ", {id :id, chat})
            result.null, {id: id, room}
        })
        return 200;
    }

Room.remove = (bytitle, result) => {
    sql.promise().query('DELETE FROM Room WHERE title = ?', [bytitle], (err, res) => {
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
    return 200;       
}

module.exports = Room




