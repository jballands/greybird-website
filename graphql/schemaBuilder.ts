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
				if (id !== undefined && city.id === id) {
					return true;
				}
				if (
					name !== undefined &&
					city.id.toLowerCase().includes(lowercaseName)
				) {
					return true;
				}
				if (
					name !== undefined &&
					city.name.toLowerCase().includes(lowercaseName)
				) {
					return true;
				}
				return false;
			});
		},
		routes: (_, { arrive, depart, elevated, flightNumber }) => {
			const lowercaseArrive = arrive?.toLowerCase();
			const lowercaseDepart = depart?.toLowerCase();

			// This is an AND operation, not an OR operation. That is, all the criteria have to be
			// satisfied for a route to be selected
			return routes.filter(rte => {
				if (elevated !== undefined && rte.elevated !== elevated) {
					return false;
				}

				if (flightNumber !== undefined && rte.flightNumber !== flightNumber) {
					return false;
				}

				if (
					lowercaseDepart !== undefined &&
					rte.depart.toLowerCase() !== lowercaseDepart
				) {
					return false;
				}

				if (
					lowercaseArrive !== undefined &&
					rte.arrive.toLowerCase() !== lowercaseArrive
				) {
					return false;
				}

				return true;
			});
		},
	},
};

export default createSchema({
	typeDefs,
	resolvers,
});
