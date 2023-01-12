import { getTopThree } from './models/imgs.model';
import User from './db/schema/user.schema';
import Rating from './db/schema/ratings.schema';
import Pothole from './db/schema/pothole.schema';

export const issueBadges = async () => {
  getTopThree((data) => {
    data.forEach((each) => {
      if (each.count >= 50) {
        User.update({ badge_id: 1 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 40) {
        User.update({ badge_id: 2 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 30) {
        User.update({ badge_id: 3 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 20) {
        User.update({ badge_id: 4 }, { where: { user_id: each.user_id } });
      } else if (each.count >= 10) {
        User.update({ badge_id: 5 }, { where: { user_id: each.user_id } });
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
setInterval(fixedAutomation, 100 * 60 * 15);

setInterval(issueBadges, 1000 * 60 * 15);
