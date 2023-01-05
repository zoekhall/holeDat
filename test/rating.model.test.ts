import axios from 'axios';

test('get all rating of pothole route should send back an object', () => {
  axios
    .get('/api/rating/rating' + 1)
    .then((data) => expect(typeof data.data).toEqual('object'))
    .catch((err) => err);
});

test('get all ratings of pothole route should have the same pothole id as the input id', () => {
  const id = 2;
  axios
    .get('/api/rating/rating' + id)
    .then((data) => expect(data.data.pothole_id).toEqual(id))
    .catch((err) => err);
});

test('get all ratings of pothole route should have all rating properties', () => {
  axios
    .get('/api/rating/rating' + 1)
    .then((data) => {
      const { pothole_id, user_id, fixed, overall, rating_id } = data.data;
      expect(data.data).toEqual(
        expect.objectContaining({
          pothole_id,
          user_id,
          fixed,
          overall,
          rating_id,
        })
      );
    })
    .catch((err) => err);
});
