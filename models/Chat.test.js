const Chat = require('./Chat.js')

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

describe("Chat model", () => {
    const newChat = new Chat({
        id : 2,
        room : 'there',
        user : 2,
        chat : generateRandomString(20),
        gif : null,
        nick : "Cherry",
    })
    
    test("Chat 테이블에 새로운 유저를 추가합니다. Chat.create", (done) => {

        Chat.create(newChat, (err, data) => {
            if(err){
                done(err)
                console.error(err)
                return
            }
            if(data){
                // console.log(data)
                done()
            }  
        })
    })
    test("Chat 테이블의 데이터를 모두 데이터를 가져옵니다. Chat.getAll();", (done) => {
        Chat.getAll((err, data) => { 
            if(err){
                done(err)
                console.error(err)
                return
            }
            if(data){
                // console.log(data)
                done()
            }
        }, {direction : ["DESC", "3"]})
    })
    test("Chat 테이블에 id값을 이용해 값을 찾음. findByClient", (done) => {
        Chat.findByChat(newChat ,  (err, data) => {
            if(err){
                done(err)
                console.error(err)
                return
            }
            if(data){
                // console.log(data)
                done()
            }
        })
        
    })

    const newchat2 = new Chat({
        id : 2,
        room : "there",
        user : 1,
        chat : "yum, hi!",
        gif : null,
    })
    test("Chat 테이블 Chat.updateByID();", (done) => {

        Chat.updateByID(newChat.id, newchat2 , (err, data) => { 
            if(err){
                done(err)
                console.error(err)
                return
            }
            if(data){
                // console.log(data)
                done()
            }
        });
    })



    test("Chat 테이블에 행을 제거. ", (done) => {  // upddate 된 객체로 삭제
        Chat.remove( newchat2, (err, data) => {
            if(err){
                done(err)
                console.error(err)
                return
            }
            if(data){
                // console.log(data)
                done()
            }
        })
    })
});