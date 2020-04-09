import { objectType } from '@nexus/schema';

export const Category = objectType({
  name: 'Brand',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});
