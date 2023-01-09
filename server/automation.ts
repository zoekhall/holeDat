import { getTopThree } from './models/imgs.model';
import User from './db/schema/user.schema';
import Rating from './db/schema/ratings.schema';
import Pothole from './db/schema/pothole.schema';

export const issueBadges = async () => {
  getTopThree((data) => {
    data.forEach((each) => {
      //issue plat
      if (each.count >= 5) {
        User.update({ badge_id: 5 }, { where: { user_id: each.user_id } });
        //issue Gold
      } else if (each.count >= 4) {
        User.update({ badge_id: 1 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 3) {
        User.update({ badge_id: 2 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 2) {
        User.update({ badge_id: 3 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 1) {
        User.update({ badge_id: 4 }, { where: { user_id: each.user_id } });
      } else {
        User.update({ badge_id: undefined }, { where: { user_id: each.user_id } });
      }
    });
  });
};

export const fixedAutomation = async () => {
  const counted = await Rating.count({
    col: 'pothole_id',
    group: ['pothole_id', 'fixed'],
  });

  const fixedPh = counted.filter((x) => x.fixed);

  fixedPh.forEach((ph) => {
    if (ph.count >= 3) {
      Pothole.update({ fixed: true }, { where: { pothole_id: ph.pothole_id } }).catch((err) =>
        console.log(err)
      );
    }
  });
};
fixedAutomation();

setInterval(issueBadges, 1000 * 60 * 15);
