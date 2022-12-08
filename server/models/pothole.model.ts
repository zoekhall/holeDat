import Pothole from '../db/schema/pothole.schema'

const getAllPotholes = (cb) => {
  Pothole.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};


export default getAllPotholes
