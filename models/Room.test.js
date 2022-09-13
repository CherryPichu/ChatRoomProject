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

    const result = (err, data) => { return err }
    test("Room 테이블의 데이터를 모두 데이터를 가져옵니다. Room.getAll();", async () => {
        
        
        expect( Room.getAll() ).not.toEqual(500);
    })

    test("Room 테이블에 새로운 유저를 추가합니다. Room.create", () => {

        expect(Room.create(newRoom, result) ).toEqual(200)
    })

    test("Room 테이블에 title값을 이용해 값을 찾음. findByTitle", () => {
        expect( Room.findByTitle(newRoom.title, result) ).toEqual(200)
        
    })

    test("Room 테이블에 행을 제거. ", async () => {
        expect(await Room.remove(newRoom.title, result) ).toEqual(200)
    })
    
})

