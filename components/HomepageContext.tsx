import type {
	FetchRoutesQuery,
	FetchRoutesQueryVariables,
} from '../graphql/gen/graphql';

import React, {
	createContext,
	useContext,
	useCallback,
	useState,
	ReactNode,
} from 'react';
import useGraphQL from './useGraphQL';

type FetchRoutesQueryRoutes = FetchRoutesQuery['routes'];

const routesQuery = /* GraphQL */ `
	query fetchRoutes($depart: ID!, $arrive: ID) {
		routes(filter: { depart: { id: $depart }, arrive: { id: $arrive } }) {
			flightNumber
			elevated
			depart {
				name
				coordinate {
					lat
					lng
				}
			}
			arrive {
				name
				coordinate {
					lat
					lng
				}
			}
		}
	}
`;

// ------------------------------------------------------------------------------

export interface HomepageContext {
	departingAirport?: string;
	arrivingAirport?: string;
	setDepartingAirport: (airportId?: string) => unknown;
	setArrivingAirport: (airportId?: string) => unknown;
	routes: FetchRoutesQueryRoutes;
	isValidatingRoutes: boolean;
}

const _HomepageContext = createContext<HomepageContext | null>(null);

interface HomepageContextProps {
	children: ReactNode;
}

export function HomepageContext({ children }: HomepageContextProps) {
	const [departingAirport, setDepartingAirport] = useState<
		string | undefined
	>();
	const [arrivingAirport, setArrivingAirport] = useState<string | undefined>();

	const getQueryParameters = useCallback((): FetchRoutesQueryVariables => {
		if (!departingAirport || !arrivingAirport) {
			return {
				depart: 'aus',
				arrive: undefined,
			};
		}
		return {
			depart: departingAirport,
			arrive: arrivingAirport,
		};
	}, [arrivingAirport, departingAirport]);

	const { data, isValidating } = useGraphQL<
		FetchRoutesQuery,
		FetchRoutesQueryVariables
	>('fetchRoutes', routesQuery, getQueryParameters());

	const value: HomepageContext = {
		departingAirport,
		arrivingAirport,
		setDepartingAirport,
		setArrivingAirport,
		routes: data?.routes ?? [],
		isValidatingRoutes: isValidating,
	};

	return (
		<_HomepageContext.Provider value={value}>
			{children}
		</_HomepageContext.Provider>
	);
}

export function useHomepage() {
	const context = useContext(_HomepageContext);

	if (!context) {
		throw new Error(
			'You need to use this hook inside of a HomepageContext first!'
		);
	}

	return context;
}
