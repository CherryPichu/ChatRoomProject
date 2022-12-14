const sql = require('./db.config.js')

const DBNAME = "Chat"

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
    this.nick = chat.nick

    // this.createAt = chat.createAt
}


function MakeWhereWord (objdb){
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


Chat.create = (newChat, result) => { // export {create, Chat(객체), findByChat ... } 이런식으로 됨. findByChat 에서 this를 써도 Chat 객체의 변수에 접근할 수 없음. <-- 아닐 수 있음 검증이 필요함!! 22-09-16
    sql.query('insert into Chat SET ? ', newChat, (err, res) => {
        if(err){
            console.log("error : ", err)
            result(err, null)
            return;
        }
        result(null, res)
        // console.log("Created Chat: ", {id : res.insertId, email : res.email, newClient})
    })
}



Chat.findByChat = (byChat, result ) => {

    let query = "SELECT * FROM Chat"
    
    query += MakeWhereWord(byChat)
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if(res.length) {
            // console.log("found chat : ", res[0])
            result(null, res)
            return;
        }
        
        result({kind : "not_found"}, null);
    })
}

Chat.loadChat = (byChat, result, num ) => {

    let query = "SELECT * FROM Chat"
    
    query += MakeWhereWord(byChat)
    query += " ORDER BY createAt DESC LIMIT " + num 
    sql.query(query, (err, res) => {
        res.reverse()// 한반 뒤집어 줘야 순서대로 출력됨.
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
        }
        if(res.length) {
            // console.log(res.reverse())
            // console.log("found chat : ", res[0])
            result(null, res)
            return;
        }
        
        result({kind : "not_found"}, null);
    })
}


function findByCondition (result, query,  params = { direction : ["", ""], }) {
    const doing = query.split(" ")[0] //ex) select
    // console.log("doing : " + doing)
    const direction = params.direction
    const startPoint = direction[0]
    const number = direction[1]

    //SELECT * FROM Chat ORDER BY createAt LIMIT 3
    if(startPoint != "ASC" && startPoint != "DESC" && startPoint != ""){
        result("ASC 또는 DESC에 해당하는 값을 넣으셔야 합니다." , null)
    }else{
        if(startPoint != "")
            query = doing + " * FROM " + DBNAME +" ORDER BY createAt " + startPoint +" LIMIT " + number
    }
    return query
}
Chat.getAll = (result, params = { direction : ["", ""], } ) => { // ex) {direction : ["Top", "3"]}
    


    let query = "SELECT * FROM Chat"
    query = findByCondition(result, query, params)

    sql.query(query, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null)
            return;
        }

        // console.log("chat : ", res);
        result(null, res)
        /*
        [
            {
            id: 1,
            room: 'there',
            user: 2,
            chat: 'ibNpSjjaqnPnluzIrxGf',
            gif: null,
            createAt: 2022-09-30T02:25:25.000Z
            }
        ]

        */
    })
}
/*
 data : 
 [
  {
    title: 'there',
    inPeople: 1,
    max: 5,
    owner: 2,
    password: '1234',
    createAt: 2022-09-06T08:53:17.000Z,
    state: 'Public'
  }
]
*/


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
            result(null, res)
        })
        return 200;
    }

Chat.remove = (byChat, result) => {
    let query = "DELETE FROM Chat "
    query += MakeWhereWord(byChat)
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
        // console.log("deleted cutomer with email : ", byemail);
        result(null, res);
    })
    return 200;       
}



module.exports = Chat

