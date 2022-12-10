import User from '../db/schema/user.schema';

const getRecentUsers = (cb) => {
  User.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']],
  })
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export default getRecentUsers;
