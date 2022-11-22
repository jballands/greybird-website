export const typeDefs = `
	type Query {
		destinations(id: String, name: String): [City]
		coordinates(id: String): [Coordinate]
		routes(flightNumber: Int, depart: ID, arrive: ID, elevated: Boolean): [Route]
	}

	type City {
		id: ID!
		name: String!
		routes: [Route]!
		coordinate: Coordinate!
	}

	type Route {
		id: ID!
		flightNumber: Int!
		depart: City!
		arrive: City!
		elevated: Boolean!
	}

	type Coordinate {
		id: ID!
		lat: Float!
		lng: Float!
	}
`;
