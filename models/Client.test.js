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


    test("Client 테이블의 데이터를 모두 데이터를 가져옵니다. Client.getAll();", (done) => {
            //https://jestjs.io/docs/asynchronous  내용 중 Callbacks 부분에서.
            // done 함수를 이용해 비동기 함수 테스트!
            client.getAll((err, data) => { 
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

    test("Client 테이블에 새로운 유저를 추가합니다. Client.create", (done) => {

        client.create(newclient, (err, data) => {
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

    test("Client 정보를 이용해 데이터를 가져옵니다.", (done) => {
        client.findByClient(newclient, (err, data) => {
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


    //delete test시 조심할 점!
    // 실수하면 전체 데이터가 지워지므로 반드시 dev DB에다 테스트!
    test("Client 테이블에 행을 제거. ", (done) => {
        client.remove(newclient, (err, data) => {
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
// client.end()


