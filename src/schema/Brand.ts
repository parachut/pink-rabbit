import { objectType } from '@nexus/schema';

export const Brand = objectType({
  name: 'Brand',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});
