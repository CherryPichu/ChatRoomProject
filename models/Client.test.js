// jest.mock('../models/client')
const client = require('./Client')

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

describe("Client models", () => {
    const newclient = new client({
        email : generateRandomString(5) + "@" + generateRandomString(5),
        password : generateRandomString(8),
        nick : generateRandomString(5),
        colorHash : null,
        snsid : null,
        deletedAt : null,
    })

    const result = (err, data) => { return err }
    test("Client 테이블의 데이터를 모두 데이터를 가져옵니다. Client.getAll();", async () => {
        expect( await client.getAll(result) ).not.toEqual(500);
    })

    test("Client 테이블에 새로운 유저를 추가합니다. Client.create", () => {

        expect(client.create(newclient, result) ).toEqual(200)
    })

    test("Client 테이블에 id값을 이용해 값을 찾음. findByClient", () => {
        const byclient = new client ({
            email : "uskawjdu@gmail.com",
        })
        expect( client.findByClient(byclient, result) ).toEqual(200)
        
    })

    test("Client 테이블에 행을 제거. ", async () => {
        expect(await client.remove(newclient.email, result) ).toEqual(200)
    })
    
})
// client.end()


