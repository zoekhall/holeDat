import {
  getUserData,

} from "../server/models/user.model";


test('Am I getting an object', ()=>{
  getUserData(1, data=>
     expect(typeof data).toBe('object'))
})

