import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:3000/api/graphql',
	documents: './components/**/*.{ts,tsx}',
	generates: {
		'./gql/': {
			preset: 'client',
			plugins: [],
		},
		'./pages/api/resolversTypes.ts': {
			config: {
				useIndexSignature: true,
			},
			plugins: ['typescript', 'typescript-resolvers'],
		},
	},
};

export default config;
