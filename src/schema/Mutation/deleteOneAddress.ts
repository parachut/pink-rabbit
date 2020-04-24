import { extendType, arg } from '@nexus/schema';

export const deleteOneAddress = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteOneAddress', {
      type: 'Address',
      args: {
        where: arg({ type: 'AddressWhereUniqueInput', required: true }),
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.address.update({
          where: {
            id: args.where.id,
          },
          data: {
            deleted: true,
            history: {
              create: {
                action: 'DELETED',
                userId: ctx.currentUser.id,
              },
            },
          },
        });
      },
    });
  },
});
