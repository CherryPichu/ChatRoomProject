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
        id : 10,
        room : "there",
        user : 2,
        chat : "Hello everyone",
        gif : null,
    })
    
    test("Chat 테이블에 새로운 유저를 추가합니다. Chat.create", () => {

        expect( Chat.create(newChat, result) ).toEqual(200)
    })
    const result = (err, data) => { return err }
    test("Chat 테이블의 데이터를 모두 데이터를 가져옵니다. Chat.getAll();", () => {
        expect( Chat.getAll(result) ).toEqual(200);
    })

    test("Chat 테이블 Chat.updateByID();", () => {
        const newchat2 = new Chat({
            id : 10,
            room : "there",
            user : 1,
            chat : "yum, hi!",
            gif : null,
        })
        expect( Chat.updateByID(newChat.id, newchat2 , result) ).toEqual(200);
    })

    test("Chat 테이블에 id값을 이용해 값을 찾음. findByClient", () => {
        expect( Chat.findByID(newChat.id, result) ).toEqual(200)
        
    })

    test("Chat 테이블에 행을 제거. ", () => {
        expect(Chat.remove(newChat.id, result) ).toEqual(200)
    })
});