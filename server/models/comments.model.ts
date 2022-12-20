import Comment from "../db/schema/comments.schema";
import User from "../db/schema/user.schema";

// post comment with phId
export const postComment = (text, pothole_id, user, cb) => {
  const user_id = user.dataValues.user_id
  Comment.create({
    text,
    user_id,
    pothole_id
  })
    .then(data => cb(data))
    .catch(err => console.error(err))
}

export const getComments = (pothole_id, cb) => {
  Comment.findAll({
    where: { pothole_id },
    include: [User]
  }).then(data => cb(data))
}

// deletes comment by id
export const deleteCom = (id, cb) => {
  Comment.destroy({where: {comment_id: id}})
  .then(data => cb(data))
  .catch(err => cb(err))
}