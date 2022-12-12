import Pothole from '../db/schema/pothole.schema';

export const getAllPotholes = (cb) => {
  Pothole.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export const postPothole = (cb) => {
  Pothole.create({})
    .then(data => cb(data))
    .catch(err => console.error(err))
}

export default getAllPotholes;