import { extendType } from '@nexus/schema';

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.crud.product();
    t.crud.products();
    t.crud.brand();
    t.crud.brands();
    t.crud.category();
    t.crud.categories();
  },
});
