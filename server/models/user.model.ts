import User from '../db/index';

type USER = {
  name: string;
  email: string;
};

const addUser = (userObj: USER, cb) => {
  User.create(userObj)
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

const findUser = (email: string, cb) => {
  User.findOne({ email })
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export default { addUser, findUser };
