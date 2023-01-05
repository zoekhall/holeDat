import Badge from '../db/schema/badges.schema';

export const getBadgeAtId = (badgeId, cb) => {
  Badge.findOne({ where: { badge_id: badgeId } })
    .then((data) => cb(data))
    .catch((err) => console.log(err));
};
