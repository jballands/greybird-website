import type { City } from '../gql/graphql';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Connection = readonly [departing: City, arriving: City];

export const createConnection = (
	departs?: City,
	arrives?: City
): Connection | undefined => {
	if (!departs || !arrives) {
		return undefined;
	}

	return [departs, arrives] as const;
};

// ------------------------------------------------------------------------------

interface HomepageContext {
	setDeparting: (city: City) => unknown;
	setArriving: (city: City) => unknown;
	connection?: Connection;
}

const homepageContext = createContext<HomepageContext | null>(null);

interface HomepageContextProps {
	children: ReactNode;
}

export function HomepageContext({ children }: HomepageContextProps) {
	const [departing, setDeparting] = useState<City>();
	const [arriving, setArriving] = useState<City>();

	const value = {
		setDeparting,
		setArriving,
		connection: createConnection(departing, arriving),
	};

	return (
		<homepageContext.Provider value={value}>
			{children}
		</homepageContext.Provider>
	);
}

export function useHomepage() {
	const context = useContext(homepageContext);

	if (!context) {
		throw new Error(
			'You need to use this hook inside of a HomepageContext first!'
		);
	}

	return context;
}
