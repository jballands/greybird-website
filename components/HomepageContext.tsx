import React, { createContext, useContext, useState, ReactNode } from 'react';

type Connection = readonly [departing?: string, arriving?: string];

export const createConnection = (
	departs?: string,
	arrives?: string
): Connection | undefined => {
	if (!departs || !arrives) {
		return undefined;
	}

	return [departs, arrives] as const;
};

// ------------------------------------------------------------------------------

interface HomepageContext {
	setDeparting: (id?: string) => unknown;
	setArriving: (id?: string) => unknown;
	connection?: Connection;
}

const homepageContext = createContext<HomepageContext | null>(null);

interface HomepageContextProps {
	children: ReactNode;
}

export function HomepageContext({ children }: HomepageContextProps) {
	const [departing, setDeparting] = useState<string>();
	const [arriving, setArriving] = useState<string>();

	const value = {
		setDeparting,
		setArriving,
		connection: createConnection(departing, arriving),
	};

	console.dir(departing);
	console.dir(arriving);
	console.dir(value);

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
