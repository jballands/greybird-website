import type { Resolvers } from './gen/types';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { createSchema } from 'graphql-yoga';
import { coordinates, destinations, routes } from './database';

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

const resolvers: Resolvers = {
	Coordinate: {
		id: parent => parent.id,
		lat: parent => parent.lat,
		lng: parent => parent.lng,
	},
	City: {
		id: parent => parent.id,
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
		destinations: (_, { id, name }) => {
			const lowercaseName = name?.toLowerCase() ?? '';

			return destinations.filter(city => {
				if (city.id === id) {
					return true;
				}
				if (city.id.toLowerCase().includes(lowercaseName)) {
					return true;
				}
				if (city.name.toLowerCase().includes(lowercaseName)) {
					return true;
				}
				return false;
			});
		},
		routes: (_, { arrive, depart, elevated, flightNumber }) => {
			const lowercaseArrive = arrive?.toLowerCase() ?? '';
			const lowercaseDepart = depart?.toLowerCase() ?? '';

			return routes.filter(rte => {
				if (rte.elevated === elevated) {
					return true;
				}
				if (rte.flightNumber === flightNumber) {
					return true;
				}
				if (rte.arrive.toLowerCase() === lowercaseArrive) {
					return true;
				}
				if (rte.depart.toLowerCase() === lowercaseDepart) {
					return true;
				}
				return false;
			});
		},
	},
};

export default createSchema({
	typeDefs,
	resolvers,
});
