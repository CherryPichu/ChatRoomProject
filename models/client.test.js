const client = require('../models/client')

describe("client models", () => {
    
    test("db에 내용을 추가합니다.", async () => {
        
        const result = jest.fn((err, data) => { return data })
        const value = client.getAll(result)
        console.log(value)
        // console.log(result)
        // expect(result).toBeCalledTimes(1);
        expect(result).toHaveBeenCalled();
    })
})


