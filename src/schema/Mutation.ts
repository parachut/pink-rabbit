import { extendType } from '@nexus/schema';

export const Query = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneShipment();
  },
});
