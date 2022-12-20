import { getTopThree } from "./models/imgs.model"
import User from './db/schema/user.schema'



export const issueBadges = async () =>{
  getTopThree(data=> {
    data.forEach(each => {
      //issue plat
      if(each.count >= 20){
        User.update(
          {badge_id: 1},
          {where: {user_id: each.user_id}}
        )
          //issue Gold
       } else if(each.count >= 15){
        User.update(
          {badge_id: 2},
          {where: {user_id: each.user_id}}
        )
       } else if(each.count >= 10){
        User.update(
          {badge_id: 3},
          {where: {user_id: each.user_id}}
        )
       } else if(each.count >= 5){
        User.update(
          {badge_id: 4},
          {where: {user_id: each.user_id}}
        )
       } else {
        User.update(
          {badge_id: 0},
          {where: {user_id: each.user_id}}
        )
       }
    });
  })
}

setInterval(issueBadges, 1000 * 60 * 15 )
