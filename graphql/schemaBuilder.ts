import type { Resolvers } from './gen/types';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { coordinates, destinations } from './database';

const typeDefs = loadSchemaSync('./schema.graphql', {
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
			dangerousFind(destinations, city => city.id === parent.id),
		arrive: parent =>
			dangerousFind(destinations, city => city.id === parent.id),
	},
	Query: {
		coordinates: (parent: unknown, { id }) => {
			if (!id) {
				return [];
			}
			return dangerousFind(coordinates, coord => coord.id === id),
		},
		destinations: (parent: unknown, { id, name }) => {	
			const results = [];

			destinations.forEach(city => {
				
			});

			return results;
		}
	},
};
