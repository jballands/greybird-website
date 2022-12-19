import type { FindCityWithConstraintsQuery, FindCityWithConstraintsQueryVariables } from '../../graphql/gen/graphql'

import { useCallback } from 'react';
import useGraphQL from '../useGraphQL';

const findCityWithConstraintsQuery = /* GraphQL */ `
	query findCityWithConstraints($departSearch: String, $arriveSearch: String) {
		routes(
			filter: {
				depart: { code: $departSearch, name: $departSearch }
				arrive: { code: $arriveSearch, name: $arriveSearch }
			}
		) {
			depart {
				id
				name
			}
			arrive {
				id
				name
			}
		}
	}
`;

function useFindCity(search: string) {
	const {} = useGraphQL<FindCityWithConstraintsQuery, FindCityWithConstraintsQueryVariables>('findCityWithConstraints', findCityWithConstraintsQuery, {});

	const handleFetchAirports = useCallback((id: string, search: string) => {
		if () {

		}
	}, []);
}