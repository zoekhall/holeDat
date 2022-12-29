import Sequelize from '../db/db.server';
import Pothole from '../db/schema/pothole.schema';
import PotholeIMG from '../db/schema/potholeImgs.schema';
import User from '../db/schema/user.schema';

//get all img of pothole mostly for testing
export const getAllImgs = (cb) => {
  PotholeIMG.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export const getAllImgsWithAddress = (cb) => {

  const addAddress = (potholeIdArr, potholeArr) => {
    Pothole.findAll({ // find all potholes and get lat lon and pothole id
      attributes: ['pothole_id', 'lat', 'lon', 'fixed',
        [Sequelize.literal("0"), 'potholeIdArr']],
      where: { pothole_id: potholeIdArr }
    })
      .then(data => {
        const latLonObj = data.map(data => [data.lat, data.lon, data.pothole_id, data.fixed]) // take the lat lon and on each pothole add the lat lon that corrisponds witht he pothole_id
        potholeArr.forEach(imgObj => {
          latLonObj.forEach(latLonArr => {
            if (latLonArr[2] === imgObj.pothole_id) {
              imgObj.addressDetails = { lat: latLonArr[0], lon: latLonArr[1], pothole_id: latLonArr[2] }
              imgObj.fixed = latLonArr[3]
            }
          })
        })
        cb(potholeArr)
      })
      .catch(err => console.log(err))
  }


  PotholeIMG.findAll({})
    .then((data) => data.map(val => val.dataValues))
    .then(data => addAddress(data.map(val => val.pothole_id), data))
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
export const postImg = async (pothole_id: number, caption: string, photoURL: string, user_id: number) => {
  PotholeIMG.create({ pothole_id, caption, photoURL, user_id })
    .catch((err) => console.log(err));
};
