import Like from "../db/schema/likes.schema";


export const addLike = (newlikeType, user_id, image_id) => {
   Like.findOne({where: {user_id, image_id}})
   .then(data=> {
    if(!data?.dataValues){
      Like.create({likeType: newlikeType, user_id, image_id})
      .catch(err=> console.log(err))
    } else{
      const { likes_id, likeType } = data.dataValues
      if(likeType === newlikeType){
        Like.destroy({where:{likes_id}})
        .catch(err=> console.log(err))
      } else {
        Like.update({likeType},{where:{likes_id}})
        .catch(err=> console.log(err))
      }
    }
  })
  .catch(err=> console.log(err))
}

export const getLikesByImgId = (image_id, cb) => {
  Like.findAll({where: {image_id}})
  .then(data => cb(data))
  .catch(err => cb(err))
}

export const getLikeStatus = (user_id, image_id, cb) => {
  Like.findOne({where: {user_id, image_id}})
  .then(data=> cb(data))
  .catch(err => console.log(err))
}
