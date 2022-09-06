const sql = require('./db.config.js')


/**
 * @swagger
 *  components :
 *  schemas :
 *   Chat : 
 *      properties :
 *       id :
 *          type : int(11)
 *       room :
 *          type : varchar(30)
 *       user :
 *          type : int(11)
 *       chat : 
 *          type : TEXT
 *       git :
 *          type : varchar(50) 
 *       createAt :
 *          type : DATETIME
 *          default : current_TIMESTAMP()
 *        
 */  

// 생성자
const Chat = function (chat) {
    this.id = chat.id
    this.room = chat.room
    this.user = chat.user
    this.chat = chat.chat
    this.gif = chat.gif
    // this.createAt = chat.createAt
}

Chat.create = (newChat, result) => {
    sql.query('insert into Chat SET ? ', newChat, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        // console.log("Created Chat: ", {id : res.insertId, email : res.email, newClient})
    })
    return 200;
}



Chat.findByID = (chatID, result) => {
    sql.query("SELECT * FROM Chat Where id = ?", [chatID], (err,res) => {
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

Chat.getAll = result => {
    sql.query("SELECT * FROM Chat", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }

        // console.log("chat : ", res);
        result(null, res)
    })
    return 200;
}


Chat.updateByID = (id, chat, result) => {

    // id : 
    // chat : chat 객체를 던져줌
    sql.query("UPDATE Chat SET ? WHERE id = ?", [chat, id],
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

            // console.log("update chat : ", {id :id, chat})
            result.null, {id: id, chat}
        })
        return 200;
    }

Chat.remove = (byid, result) => {
    sql.promise().query('DELETE FROM Chat WHERE id = ?', [byid], (err, res) => {
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

module.exports = Chat

