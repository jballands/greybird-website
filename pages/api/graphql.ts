import type { Resolvers } from './gen/resolversTypes';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { createYoga } from 'graphql-yoga';
import schema from '../../graphql/schemaBuilder';

export default createYoga({
	schema,
	// Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
	graphqlEndpoint: '/api/graphql',
});
