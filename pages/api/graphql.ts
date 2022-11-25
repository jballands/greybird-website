import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema';
import { ResolversTypes } from './resolversTypes';
import {
	coordinates,
	destinations,
	routes,
	City,
	Coordinate,
	Route,
} from './data';

const resolvers: ResolversTypes = {
	Query: {
		destinations: (
			parent: unknown,
			{ id = '', name = '' }: { id?: string; name?: string }
		) => {
			// Sanity check
			if (!id && !name) {
				return destinations;
			}

			return destinations.reduce<City[]>((results, city) => {
				// Check id
				if (city.id.toLowerCase().includes(id.toLowerCase())) {
					results.push(city);
				}
				// Check name
				if (city.name.toLowerCase().includes(name.toLowerCase())) {
					results.push(city);
				}

				return results;
			}, []);
		},
		coordinates: (parent: unknown, { id = '' }: { id?: string }) => {
			// Sanity check
			if (!id) {
				return coordinates;
			}

			return coordinates.reduce<Coordinate[]>((results, coord) => {
				// Check id
				if (coord.id.toLowerCase().includes(id.toLowerCase())) {
					results.push(coord);
				}

				return results;
			}, []);
		},
		routes: (
			parent: unknown,
			{
				flightNumber,
				depart,
				arrive,
				elevated,
			}: {
				flightNumber?: number;
				depart?: string;
				arrive?: string;
				elevated?: boolean;
			}
		) => {
			// Sanity check
			if (!flightNumber && !depart && !arrive && elevated === undefined) {
				return routes;
			}

			return routes.reduce<Route[]>((results, route) => {
				// Check flight number
				if (flightNumber === route.flightNumber) {
					results.push(route);
				}

				// Check depart
				if (depart === route.depart) {
					results.push(route);
				}

				// Check arrive
				if (arrive === route.arrive) {
					results.push(route);
				}

				// Check elevated
				if (elevated === route.elevated) {
					results.push(route);
				}

				return results;
			}, []);
		},
	},
	Route: {
		id: (parent: Route) => parent.id,
	},
	City: {
		id: (parent: City) => parent.id,
		name: (parent: City) => parent.name,
		routes: (parent: City) =>
			routes.filter(route => route.depart === parent.id),
		coordinate: (parent: City) =>
			coordinates.find(coord => coord.id === parent.id),
	},
	Coordinate: {
		id: (parent: Coordinate) => parent.id,
		lat: (parent: Coordinate) => parent.lat,
		lng: (parent: Coordinate) => parent.lng,
	},
};

const schema = createSchema<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	typeDefs,
	resolvers,
});

export default createYoga<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	schema,
	// Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
	graphqlEndpoint: '/api/graphql',
});
