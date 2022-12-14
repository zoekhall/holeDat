import User from '../db/schema/user.schema';

export const getUserData = (id, cb) => {
  User.findOne({ where: { user_id: id } })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

export const getRecentUsers = (cb) => {
  User.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']],
  })
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};



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
//};

// export default { addUser, findUser };


