const Room = require('./Room')

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

describe("Room models", () => {
    const newRoom = new Room({
        title : "two",
        max : 20,
        owner : 1,
        password : 1234,
    })

    test("Room 테이블의 데이터를 모두 데이터를 가져옵니다. Room.getAll();", (done) => {
        Room.getAll((err, data) => {
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

    test("Room 테이블에 새로운 유저를 추가합니다. Room.create", (done) => {

        Room.create(newRoom, (err, data) => {
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

    test("Room 값을 찾음. findByRoom", (done) => {
        Room.findByRoom(newRoom, (err, data) => {
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


    const newRoom2 = new Room({
        title : "test new Room",
        max : 10,
        owner : 1,
        password : 1234,
    })
    test("Room 값을 찾음. findByRoom", (done) => {
        Room.updateByTitle(newRoom.title, newRoom2, (err, data) => {
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


    test("Room 테이블에 행을 제거. ", (done) => {
        Room.remove(newRoom2, (err, data) => {
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
    
})

