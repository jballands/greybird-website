/**
 * I personally had zero luck using Prisma's GraphQL request library...
 *
 * Instead of wrestling with it, I figured it'd be a good exercise to
 * build my own!
 */

import { useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';

interface GraphQLRequest<V> {
	operationName: string;
	query: string;
	variables?: V;
}

function useGraphQL<QueryResponse, Variables>(
	operationName: string,
	query: (() => string | undefined | never) | string,
	variables?: Variables
) {
	const key = useCallback(() => {
		// If the query is just a query, use it
		if (typeof query === 'string') {
			return [query, variables];
		}

		// Otherwise get it and see if we can return a key now
		const result = query();

		if (result) {
			return [result, variables];
		}

		return null;
	}, [query, variables]);

	const fetcher = useCallback(
		async ([_query, _variables]: [string, Variables]) => {
			const requestBody: GraphQLRequest<Variables> = {
				operationName,
				query: _query,
				variables: _variables,
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
		},
		[operationName]
	);

	const { data, error, isValidating } = useSWRImmutable<QueryResponse>(
		key,
		fetcher
	);

	return { data, error, isValidating };
}

export default useGraphQL;
