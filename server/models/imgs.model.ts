import Pothole from '../db/schema/pothole.schema';
import PotholeIMG from '../db/schema/potholeImgs.schema';
import User from '../db/schema/user.schema';

//get all img of pothole mostly for testing
export const getAllImgs = (cb) => {
  PotholeIMG.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export const getAllImgsWithAddress = (offset, sortBy, order, fixedSatus, cb) => {
  const limit = 3;
  PotholeIMG.findAll({
    include: [{ model: User }, { model: Pothole, where: { fixed: fixedSatus } }],
    limit,
    offset,
    order: [[sortBy, order]],
  }).then((data) => cb(data.map((val) => val.dataValues)));
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
    cb(users.sort((a, b) => b.count - a.count));
  });
};

//gets top 3 potholes with most images
export const getTopPotholes = (cb) => {
  PotholeIMG.count({
    col: 'pothole_id',
    group: ['pothole_id'],
  }).then((potholes) => {
    cb(potholes);
  });
};

export const getPotholeAtUserId = (id, cb) => {
  // gets all potholes that have the user id set to id param
  PotholeIMG.findAll({ where: { user_id: id } })
    .then((data) => cb(data))
    .catch((err) => console.log(err));
};

//creates image
//used by /addPothole in pothole.routes for the Pothole Form
export const postImg = async (
  pothole_id: number,
  caption: string,
  photoURL: string,
  user_id: number
) => {
  PotholeIMG.create({ pothole_id, caption, photoURL, user_id }).catch((err) => console.log(err));
};
