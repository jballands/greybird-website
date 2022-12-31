import type {
	FetchRoutesQuery,
	FetchRoutesQueryVariables,
	FindCityWithConstraintsQuery,
} from '../graphql/gen/graphql';

import React, {
	createContext,
	useContext,
	useCallback,
	useState,
	ReactNode,
	useMemo,
} from 'react';
import useGraphQL from './useGraphQL';

type Routes = FetchRoutesQuery['routes'];
type Route = Routes[0];
type Destination = FindCityWithConstraintsQuery['destinations'][0];

const routesQuery = /* GraphQL */ `
	query fetchRoutes($depart: CityFilter!, $arrive: CityFilter) {
		routes(filter: { depart: $depart, arrive: $arrive }) {
			id
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
	departingAirport?: Destination;
	arrivingAirport?: Destination;
	selectedRoute?: Route;
	setDepartingAirport: (airport?: Destination) => unknown;
	setArrivingAirport: (airport?: Destination) => unknown;
	setSelectedRoute: (route?: Route) => unknown;
	routes: Routes;
	isValidatingRoutes: boolean;
}

const _HomepageContext = createContext<HomepageContext | null>(null);

interface HomepageContextProps {
	children: ReactNode;
}

export function HomepageContext({ children }: HomepageContextProps) {
	const [departingAirport, setDepartingAirport] = useState<Destination>();
	const [arrivingAirport, setArrivingAirport] = useState<Destination>();
	const [selectedRoute, setSelectedRoute] = useState<Route>();

	const queryParams = useMemo((): FetchRoutesQueryVariables => {
		if (!departingAirport || !arrivingAirport) {
			return {
				depart: { id: 'aus' },
				arrive: undefined,
			};
		}
		return {
			depart: { id: departingAirport.id },
			arrive: { id: arrivingAirport.id },
		};
	}, [arrivingAirport, departingAirport]);

	const { data, isValidating } = useGraphQL<
		FetchRoutesQuery,
		FetchRoutesQueryVariables
	>('fetchRoutes', routesQuery, queryParams);

	const value: HomepageContext = {
		departingAirport,
		arrivingAirport,
		setDepartingAirport,
		setArrivingAirport,
		selectedRoute,
		setSelectedRoute,
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
