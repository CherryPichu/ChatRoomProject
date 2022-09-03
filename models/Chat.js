const db = require('db.config.js')


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
const Chat = (chat) =>{
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
}



Chat.findByID = (chatID, result) => {
    sql.query("SELECT * FROM Chat Where id = ?", chattID, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if(res.length) {
            console.log("found chat : ", res[0])
            result(null, res[0])
            return;
        }
        
        result({kind : "not_found"}, null);
    })
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
    return "good";
}


Chat.updateByID = (id, chat, result) => {
    sql.query("UPDATE client SET ? WHERE id = ?", chat,
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

            console.log("update chat : ", {id :id, chat})
            result.null, {id: id, chat}
        })
    }

// Chat.remove

module.exports = Chat

