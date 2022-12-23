import { routes } from './database';

function generateConnections() {
	const connectionsMap: { [cityId: string]: string[] } = {};

	routes.forEach(({ depart, arrive }) => {
		// depart -> arrive
		if (connectionsMap[depart]) {
			connectionsMap[depart].push(arrive);
		} else {
			connectionsMap[depart] = [arrive];
		}

		// arrive -> depart
		if (connectionsMap[arrive]) {
			connectionsMap[arrive].push(depart);
		} else {
			connectionsMap[arrive] = [depart];
		}
	});

	return connectionsMap;
}

export const connections = generateConnections();
