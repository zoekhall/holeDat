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

export const changeUsername = async (loggedInUser, newName) => {
  console.log(loggedInUser, newName);
  await User.update({ name: newName }, { where: { user_id: loggedInUser.user_id } });
};
