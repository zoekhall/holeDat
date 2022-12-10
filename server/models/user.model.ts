import User from '../db/schema/user.schema'

export const getUserData = (id, cb) => {
    User.findOne({where: {userUserId: id}})
  .then(data => cb(data))
  .catch(err => cb(err))
}

// type USER = {
//     name: string;
//       email: string;
// }    ;
  
// c    onst addUser = (userObj: USER, cb) => {
//       User.create(userObj)
//     .then((data) => cb(data))
//     .catch((err) => console.error(err));
// };

// const findUser = (email: string, cb) => {
//   User.findOne({ email })
//     .then((data) => cb(data))
//     .catch((err) => console.error(err));
// };

// export default { addUser, findUser };
