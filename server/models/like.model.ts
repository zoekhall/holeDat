import Like from "../db/schema/likes.schema";


export const addLike = (likeType, user_id, image_id) => {
   Like.findAll({where: {user_id, image_id}})
   .then(data=> {
    if(!data[0]){
      Like.create({likeType, user_id, image_id})
      .catch(err=> console.log(err))
    } else{
      const { likes_id } = data[0].dataValues
      Like.update({likeType},{where:{likes_id}})
      .catch(err=> console.log(err))
    }
  })
  .catch(err=> console.log(err))

}
