import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.boolean('active');
    t.string('email');
  },
});
