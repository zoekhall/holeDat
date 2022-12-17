import Pothole from '../db/schema/pothole.schema';
import Rating from '../db/schema/ratings.schema';


export const postRating = async (cb, obj) => {
  const pothole = await Pothole.findOne({
    where: { pothole_id: obj.pothole_id },
  });
  
  await pothole
    ?.createRating(obj)
    .then((data) => {
      cb(data)
    })
    .catch((err) => console.error(err));
};

export const getPotholesAtIds = (idArray, cb) => {
  const sortRating = (ratingArray) => {
    let resultArr = ratingArray.sort((a, b) => b.overall - a.overall)
    cb(resultArr)
  }

  Rating.findAll({ where: { pothole_id: idArray } })
    .then((data) => sortRating(data))
    .catch(err => console.log(err));
};

