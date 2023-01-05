import { getUserData, getRecentUsers } from '../server/models/user.model';

test('getUserData returns an Object', () =>
  getUserData(9000, (data) => expect(typeof data).toBe('object')));

test('getRecentUsers returns an Array', () =>
  getRecentUsers((data) => expect(Array.isArray(data)).toBe(true)));
