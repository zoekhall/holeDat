import { getBadgeAtId } from '../server/models/badges.model';

test('getRecentUsers returns an Array', () =>
  getBadgeAtId(3, (data) => expect(typeof data).toBe('object')));
