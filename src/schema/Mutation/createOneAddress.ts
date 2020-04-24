import { extendType, arg } from '@nexus/schema';
import { AddressCreateInput } from '../Address';

export const createOneAddress = extendType({
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

        const userId = args.data.userId || ctx.currentUser.id;

        if (userId === 'anon') {
          throw new Error('Must supply a userId or be logged in.');
        }

        const shippoAddress = await shippo.address.create(args.data);

        const address = await ctx.prisma.address.create({
          data: {
            ...args.data,
            shippoId: String(shippoAddress.object_id),
            userId,
            history: {
              create: {
                userId: ctx.currentUser.id,
              },
            },
          },
        });

        return address;
      },
    });
  },
});
