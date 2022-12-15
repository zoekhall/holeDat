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
    include: [User],
  })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

//gets top 3 users with most posts
export const getTopThree = (cb) => {
  PotholeIMG.findAndCountAll({
    attributes: ['user_id'],
    group: ['user_id'],
  }).then((data) => cb(data.count));
};

//creates image
export const postImg = async (cb, obj, photoURL) => {
  const pothole = await Pothole.findOne({
    where: { pothole_id: obj.pothole_id },
  });

  obj.photoURL = photoURL;
  console.log(obj,'model');
  await pothole
    ?.createPotholeImg(obj)
    .then((data) => {
      cb(data)
    })
    .catch((err) => console.error(err));
};
