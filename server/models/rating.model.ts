import Pothole from '../db/schema/pothole.schema';

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

export default postRating;
