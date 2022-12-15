import Rating from "../db/schema/ratings.schema";

export const postRating = (cb, obj) => {
  Rating.create(obj)
    .then(data => {cb(data)})
    .catch(err => console.error(err))
}

export default postRating;