import type {
	Resolvers,
	CityFilter,
	City,
	InputMaybe,
	RouteFilter,
} from './gen/types';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { createSchema } from 'graphql-yoga';
import {
	CityModel,
	coordinates,
	destinations,
	RouteModel,
	routes,
} from './database';
import { connections } from './aggregations';

const typeDefs = loadSchemaSync('./graphql/schema.graphql', {
	loaders: [new GraphQLFileLoader()],
});

function dangerousFind<T>(
	collection: T[],
	predicate: (val: T) => boolean
): T | never {
	const val = collection.find(predicate);
	if (!val) {
		throw new Error(
			'dangerousFind: No value evaluated to true for the predicate'
		);
	}
	return val;
}

const destinationsResolver = (
	filters?: InputMaybe<CityFilter>
): CityModel[] => {
	if (!filters) {
		return destinations;
	}

	const { id, name, code, connectsWithId } = filters;

	const lowercaseCode = code?.toLowerCase() ?? '';
	const lowercaseName = name?.toLowerCase() ?? '';
	const lowercaseConnectsWithId = connectsWithId?.toLowerCase() ?? '';

	return destinations.filter(city => {
		// First, check for connects with. If it exists and the city doesn't connect with the ID
		// specified, we can just skip it
		if (
			connectsWithId &&
			!connections[city.id]?.includes(lowercaseConnectsWithId)
		) {
			return false;
		}

		// id must match exactly
		if (id !== undefined && city.id === id) {
			return true;
		}

		// Code and name can be matched loosely
		if (code !== undefined && city.code.toLowerCase().includes(lowercaseCode)) {
			return true;
		}

		if (name !== undefined && city.name.toLowerCase().includes(lowercaseName)) {
			return true;
		}

		return false;
	});
};

const routesResolver = (filters?: InputMaybe<RouteFilter>): RouteModel[] => {
	if (!filters) {
		return routes;
	}

	const { arrive, depart, elevated, flightNumber } = filters;

	// Filter the cities, if you can. This will return to you all the destinations that could
	// match the filter
	const matchingDepartures = depart ? destinationsResolver(depart) : undefined;
	const matchingArrivals = arrive ? destinationsResolver(arrive) : undefined;

	// This is an AND operation, not an OR operation. That is, all the criteria have to be
	// satisfied for a route to be selected
	return routes.filter(rte => {
		if (elevated !== undefined && rte.elevated !== elevated) {
			return false;
		}

		if (flightNumber !== undefined && rte.flightNumber !== flightNumber) {
			return false;
		}

		// Now attempt to match the destination with the route if you can
		if (matchingDepartures) {
			return matchingDepartures.some(city => city.id === rte.depart);
		}

		if (matchingArrivals) {
			return matchingArrivals.some(city => city.id === rte.depart);
		}

		return true;
	});
};

const resolvers: Resolvers = {
	Coordinate: {
		id: parent => parent.id,
		lat: parent => parent.lat,
		lng: parent => parent.lng,
	},
	City: {
		id: parent => parent.id,
		code: parent => parent.code,
		name: parent => parent.name,
		coordinate: parent =>
			dangerousFind(coordinates, coord => coord.id === parent.id),
	},
	Route: {
		id: parent => parent.id,
		elevated: parent => parent.elevated,
		flightNumber: parent => parent.flightNumber,
		depart: parent =>
			dangerousFind(destinations, city => city.id === parent.depart),
		arrive: parent =>
			dangerousFind(destinations, city => city.id === parent.arrive),
	},
	Query: {
		coordinates: (_, { id }) =>
			dangerousFind(coordinates, coord => coord.id === id),
		destinations: (_, { filter }) => destinationsResolver(filter),
		routes: (_, { filter }) => routesResolver(filter),
	},
};

export default createSchema({
	typeDefs,
	resolvers,
});
