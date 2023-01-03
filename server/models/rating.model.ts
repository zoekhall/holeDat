import Pothole from '../db/schema/pothole.schema';
import Rating from '../db/schema/ratings.schema';

export const postRating = async (cb, obj) => {
  const pothole = await Pothole.findOne({
    where: { pothole_id: obj.pothole_id },
  });

  await pothole
    ?.createRating(obj)
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.error(err));
};

export const getPotholesAtIds = (idArray, cb) => {
  const sortRating = (ratingArray) => {
    const resultArr = ratingArray.sort((a, b) => b.overall - a.overall);
    cb(resultArr);
  };

  Rating.findAll({ where: { pothole_id: idArray } })
    .then((data) => sortRating(data))
    .catch((err) => console.log(err));
};

export const addRating = (pothole_id: number, fixed: boolean, rating: number, user_id: number) => {
  Rating.findOne({ where: { pothole_id, user_id } }).then((data) => {
    if (!data?.dataValues) {
      Rating.create({ pothole_id, fixed, overall: rating, user_id }).catch((err) =>
        console.log(err)
      );
    } else {
      Rating.update(
        { fixed, overall: rating },
        { where: { rating_id: data.dataValues.rating_id } }
      ).catch((err) => console.log(err));
    }
  });
};

export const getAllRatingsById = async (id, cb) => {
  Rating.findAll({ where: { pothole_id: id } })
    .then((data) => cb(data))
    .catch((err) => console.error(err));
};
