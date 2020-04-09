import { makeSchema, fieldAuthorizePlugin } from '@nexus/schema';
import * as User from './User';
import path from 'path';

export const schema = makeSchema({
  types: [User],
  plugins: [fieldAuthorizePlugin({})],
  outputs: {
    // I tend to use `.gen` to denote "auto-generated" files, but this is not a requirement.
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  },
});

export default schema;
