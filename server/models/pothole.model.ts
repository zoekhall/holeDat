import Pothole from '../db/schema/pothole.schema';
import Rating from '../db/schema/ratings.schema';

Pothole.hasMany(Rating, {
  sourceKey: 'pothole_id', //source in Pothole
  foreignKey: 'pothole_id', //foreign key in Rating
  as: 'ratings'
});

export const getAllPotholes = (cb) => {
  Pothole.findAll({})
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};

export const postPothole = (cb, obj) => {
  Pothole.create(obj[0])
    .then(data => { cb(data)})
    .catch(err => console.error(err))
}

export const postRating = (cb, newPothole, obj) => {
  newPothole.createRating(obj)
    .then(data => { cb(data); console.log(data) })
    .catch(err => console.error(err))
}

export default getAllPotholes;