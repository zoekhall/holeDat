import User from '../db/schema/user.schema';

export const getUserData = (id, cb) => {
  User.findOne({ where: { user_id: id } })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

export const getGraphData = (countObj, cb) => {
  const ids = countObj.map((user) => {
    return user.userUserId;
  });
  User.findAll({ where: { user_id: ids } })
    .then((data) => {
      const userObjs: any = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < countObj.length; j++) {
          if (data[i].dataValues.user_id === countObj[j].userUserId) {
            userObjs.unshift(data[i].dataValues);
            userObjs[0].count = countObj[j].count;
          }
        }
      }
      cb(userObjs);
    })
    .catch((err) => console.log(err));
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
=======

