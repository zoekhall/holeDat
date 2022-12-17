import Pothole from '../db/schema/pothole.schema';
import PotholeIMG from '../db/schema/potholeImgs.schema';
import User from '../db/schema/user.schema';

//get all img of pothole mostly for testing
export const getAllImgs = (cb) => {
  PotholeIMG.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

//gets pothole img based on pothole_id
export const getPotholeImgByPhId = (id: string, cb) => {
  PotholeIMG.findOne({ where: { pothole_id: id } })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

// gets all pothole imgs based on pothole_id and marries with corresponding user data
// based on the matching pothole_ids
export const getAllPotholeImgByPhId = (id: string, cb) => {
  PotholeIMG.findAll({
    where: { pothole_id: id },
    include: [User, Pothole],
  })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

//gets top 3 users with most posts
export const getTopThree = (cb) => {
  PotholeIMG.count({
    col: 'user_id',
    include: { model: User, attributes: ['user_id', 'photo', 'name'] },
    group: ['PotholeIMG.user_id', 'User.photo', 'User.name'],
  }).then((users) => {
    cb(users.sort((a, b) => b.count - a.count).splice(0, 3));
  });
};

//gets top 3 potholes with most images
export const getTopPotholes = (cb) => {
  PotholeIMG.findAndCountAll({
    attributes: ['pothole_id'],
    group: ['pothole_id', 'photoURL'],
  }).then((potholes) => {
    cb(potholes.count);
  });
};

//creates image
export const postImg = async (cb, obj) => {
  PotholeIMG.create(obj)
    .then((data) => {
      console.log(data);
      cb(data);
    })
    .catch((err) => console.log(err));
};
