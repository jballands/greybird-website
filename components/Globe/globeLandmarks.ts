import { create } from 'domain';

interface City {
	city: string;
	code: string;
	coordinates: {
		lat: number;
		lng: number;
	};
}

const cities: Record<string, City> = {
	abq: {
		city: 'Albuquerque',
		code: 'ABQ',
		coordinates: {
			lat: 35.02,
			lng: -106.36,
		},
	},
	atl: {
		city: 'Atlanta',
		code: 'ATL',
		coordinates: {
			lat: 33.38,
			lng: -84.25,
		},
	},
	aus: {
		city: 'Austin',
		code: 'AUS',
		coordinates: {
			lat: 30.11,
			lng: -97.4,
		},
	},
	bna: {
		city: 'Nashville',
		code: 'BNA',
		coordinates: {
			lat: 36.07,
			lng: -86.4,
		},
	},
	bos: {
		city: 'Boston',
		code: 'BOS',
		coordinates: {
			lat: 42.21,
			lng: -71,
		},
	},
	bur: {
		city: 'Burbank/Los Angeles',
		code: 'BUR',
		coordinates: {
			lat: 34.12,
			lng: -118.21,
		},
	},
	bze: {
		city: 'Belize City',
		code: 'BZE',
		coordinates: {
			lat: 17.32,
			lng: -88.18,
		},
	},
	bzn: {
		city: 'Bozeman/Yellowstone',
		code: 'BZN',
		coordinates: {
			lat: 45.77,
			lng: -111.15,
		},
	},
	cun: {
		city: 'Cancun',
		code: 'CUN',
		coordinates: {
			lat: 21.02,
			lng: -86.52,
		},
	},
	den: {
		city: 'Denver',
		code: 'DEN',
		coordinates: {
			lat: 39.51,
			lng: -104.4,
		},
	},
	e38: {
		city: 'Alpine',
		code: 'E38',
		coordinates: {
			lat: 30.38,
			lng: -103.68,
		},
	},
	gua: {
		city: 'Guatemala City',
		code: 'GUA',
		coordinates: {
			lat: 14.34,
			lng: -90.31,
		},
	},
	jac: {
		city: 'Jackson Hole',
		code: 'JAC',
		coordinates: {
			lat: 43.36,
			lng: -110.44,
		},
	},
	jfk: {
		city: 'New York',
		code: 'JFK',
		coordinates: {
			lat: 40.38,
			lng: -73.46,
		},
	},
	las: {
		city: 'Las Vegas',
		code: 'LAS',
		coordinates: {
			lat: 36.04,
			lng: -115.09,
		},
	},
	lir: {
		city: 'Liberia',
		code: 'LIR',
		coordinates: {
			lat: 10.35,
			lng: -85.32,
		},
	},
	mco: {
		city: 'Orlando',
		code: 'MCO',
		coordinates: {
			lat: 28.25,
			lng: -81.18,
		},
	},
	mia: {
		city: 'Miami',
		code: 'MIA',
		coordinates: {
			lat: 25.47,
			lng: -80.17,
		},
	},
	mex: {
		city: 'Mexico City',
		code: 'MEX',
		coordinates: {
			lat: 19.26,
			lng: -99.04,
		},
	},
	msy: {
		city: 'New Orleans',
		code: 'MSY',
		coordinates: {
			lat: 29.59,
			lng: -90.15,
		},
	},
	ord: {
		city: 'Chicago',
		code: 'ORD',
		coordinates: {
			lat: 41.58,
			lng: -87.54,
		},
	},
	pdx: {
		city: 'Portland',
		code: 'PDX',
		coordinates: {
			lat: 45.35,
			lng: -122.35,
		},
	},
	phl: {
		city: 'Philadelphia',
		code: 'PHL',
		coordinates: {
			lat: 39.52,
			lng: -75.14,
		},
	},
	pvr: {
		city: 'Puerto Vallarta',
		code: 'PVR',
		coordinates: {
			lat: 20.4,
			lng: -105.15,
		},
	},
	rdu: {
		city: 'Raleigh-Durham',
		code: 'RDU',
		coordinates: {
			lat: 35.52,
			lng: -78.47,
		},
	},
	ric: {
		city: 'Richmond',
		code: 'RIC',
		coordinates: {
			lat: 37.3,
			lng: -77.2,
		},
	},
	san: {
		city: 'San Diego',
		code: 'SAN',
		coordinates: {
			lat: 32.44,
			lng: -117.11,
		},
	},
	sav: {
		city: 'Savannah',
		code: 'SAV',
		coordinates: {
			lat: 32.07,
			lng: -81.12,
		},
	},
	sea: {
		city: 'Seattle-Tacoma',
		code: 'SEA',
		coordinates: {
			lat: 47.26,
			lng: -122.18,
		},
	},
	sjc: {
		city: 'San Jose',
		code: 'SJC',
		coordinates: {
			lat: 37.21,
			lng: -121.55,
		},
	},
	sjd: {
		city: 'Los Cabos',
		code: 'SJD',
		coordinates: {
			lat: 23.09,
			lng: -109.43,
		},
	},
	sjo: {
		city: 'San José',
		code: 'SJO',
		coordinates: {
			lat: 9.59,
			lng: -84.12,
		},
	},
	slc: {
		city: 'Salt Lake City',
		code: 'SLC',
		coordinates: {
			lat: 40.47,
			lng: -111.58,
		},
	},
	smf: {
		city: 'Sacramento',
		code: 'SMF',
		coordinates: {
			lat: 38.41,
			lng: -121.35,
		},
	},
	yul: {
		city: 'Montréal',
		code: 'YUL',
		coordinates: {
			lat: 45.28,
			lng: -73.44,
		},
	},
	yvr: {
		city: 'Vancouver',
		code: 'YVR',
		coordinates: {
			lat: 49.11,
			lng: -123.11,
		},
	},
	yyz: {
		city: 'Toronto',
		code: 'YYZ',
		coordinates: {
			lat: 43.4,
			lng: -79.37,
		},
	},
};

const createConnectionArc = (departs: City, arrives: City) => {
	return {
		startLat: departs.coordinates.lat,
		startLng: departs.coordinates.lng,
		endLat: arrives.coordinates.lat,
		endLng: arrives.coordinates.lng,
		color: '#fff',
	};
};

const createAustinConnectionArc = (arrives: City) =>
	createConnectionArc(cities.aus, arrives);

export const arcs = [
	createAustinConnectionArc(cities.den),
	createAustinConnectionArc(cities.sea),
	createAustinConnectionArc(cities.pdx),
	createAustinConnectionArc(cities.ric),
	createAustinConnectionArc(cities.jfk),
	createAustinConnectionArc(cities.yvr),
	createAustinConnectionArc(cities.sjc),
	createAustinConnectionArc(cities.bur),
	createAustinConnectionArc(cities.san),
	createAustinConnectionArc(cities.smf),
	createAustinConnectionArc(cities.slc),
	createAustinConnectionArc(cities.bzn),
	createAustinConnectionArc(cities.abq),
	createAustinConnectionArc(cities.ord),
	createAustinConnectionArc(cities.yyz),
	createAustinConnectionArc(cities.msy),
	createAustinConnectionArc(cities.mco),
	createAustinConnectionArc(cities.mia),
	createAustinConnectionArc(cities.atl),
	createAustinConnectionArc(cities.e38),
	createAustinConnectionArc(cities.mex),
	createAustinConnectionArc(cities.cun),
	createAustinConnectionArc(cities.pvr),
	createAustinConnectionArc(cities.sjd),
	createAustinConnectionArc(cities.gua),
	createAustinConnectionArc(cities.lir),
	createAustinConnectionArc(cities.sjo),
	createAustinConnectionArc(cities.bze),
	createAustinConnectionArc(cities.jac),
	createAustinConnectionArc(cities.bos),
	createAustinConnectionArc(cities.yul),
	createAustinConnectionArc(cities.phl),
	createAustinConnectionArc(cities.rdu),
	createAustinConnectionArc(cities.sav),
	createAustinConnectionArc(cities.las),
	createAustinConnectionArc(cities.bna),
];
