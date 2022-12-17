import Pothole from '../db/schema/pothole.schema';

export const getAllPotholes = (cb) => {
  Pothole.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export const postPothole = (cb, obj) => {
  Pothole.findOrCreate({
    where: { lat: obj.lat, lon: obj.lon },
    defaults: obj,
  })
    .then((data) => {
      return cb(data);
    })
    .catch((err) => console.error(err));
}

export const nearPotholes = () => {
  Pothole.findAll({
    where: {}
  })
}

export default getAllPotholes;
