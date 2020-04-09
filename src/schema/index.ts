import { fieldAuthorizePlugin, makeSchema } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';
import path from 'path';

import * as Brand from './Brand';
import * as Category from './Category';
import * as Product from './Product';
import * as Query from './Query';
import * as User from './User';

export const schema = makeSchema({
  types: [Brand, Category, Query, Product, User],
  plugins: [fieldAuthorizePlugin({}), nexusPrismaPlugin()],
  outputs: {
    // I tend to use `.gen` to denote "auto-generated" files, but this is not a requirement.
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  },
});

export default schema;
