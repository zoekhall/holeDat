import PotholeIMG from '../db/schema/potholeImgs.schema';

//get all img of pothole mostly for testing
export const getAllImgs = (cb) => {
  PotholeIMG.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

//gets pothole img based on pothole_id
export const getPotholeImgByPhId = (id: string, cb) => {
  PotholeIMG.findOne({ where: { potholePotholeId: id } })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

//gets all pothole imgs based on pothole_id
export const getAllPotholeImgByPhId = (id: string, cb) => {
  PotholeIMG.findAll({ where: { potholePotholeId: id } })
    .then((data) => cb(data))
    .catch((err) => cb(err));
};

//gets top 3 users with most posts
export const getTopThree = (cb) => {
  PotholeIMG.findAndCountAll({
    attributes: ['userUserId'],
    group: ['userUserId'],
  }).then((data) => cb(data.count));
};
