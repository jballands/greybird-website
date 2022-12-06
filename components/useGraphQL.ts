/**
 * I personally had zero luck using Prisma's GraphQL request library...
 *
 * Instead of wrestling with it, I figured it'd be a good exercise to
 * build my own!
 */

interface GraphQLRequest<V> {
	operationName: string;
	query: string;
	variables?: V;
}

import useSWR from 'swr';

function useGraphQL<QueryResponse, Variables>(
	operationName: string,
	query: (() => string | undefined | never) | string,
	variables?: Variables
) {
	const { data, error, isValidating } = useSWR<QueryResponse>(
		() => {
			if (typeof query === 'string') {
				return [query, variables];
			}

			const result = query();

			if (result) {
				return [result, variables];
			}

			return null;
		},
		async q => {
			console.dir(q);

			const requestBody: GraphQLRequest<Variables> = {
				operationName,
				query: q,
				variables,
			};

			const res = await fetch('/api/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			const { data } = await res.json();

			return data;
		}
	);

	return { data, error, isValidating };
}

export default useGraphQL;
