import { extendType, arg } from '@nexus/schema';
import { AddressCreateInput } from './Address';

export const Query = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneShipment();
    t.field('createOneAddress', {
      type: 'Address',
      args: {
        data: arg({ type: AddressCreateInput, required: true }),
      },
      async resolve(_root, args, ctx) {
        const shippo = require('shippo')(process.env.SHIPPO);

        try {
          const shippoAddress = await shippo.address.create(args.data);
          return ctx.prisma.address.create({
            data: { id: String(shippoAddress.object_id), ...args.data, userId: 'string' },
          });
        } catch (e) {
          throw e.message;
        }
      },
    });
  },
});
