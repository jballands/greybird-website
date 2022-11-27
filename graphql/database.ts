export interface CityModel {
	id: string;
	name: string;
}

export interface RouteModel {
	id: string;
	flightNumber: number;
	depart: string;
	arrive: string;
	elevated: boolean;
	seasonal?: 'winter' | 'summer';
}

export interface CoordinateModel {
	id: string;
	lat: number;
	lng: number;
}

export const destinations: CityModel[] = [
	{ id: 'aus', name: 'Austin' }, //
	{ id: 'abq', name: 'Albuquerque' }, // 1
	{ id: 'atl', name: 'Atlanta' }, //
	{ id: 'bna', name: 'Nashville' }, // 1
	{ id: 'bos', name: 'Boston' }, //
	{ id: 'bur', name: 'Burbank/Los Angeles' }, //
	{ id: 'bze', name: 'Belize City' }, // 3
	{ id: 'bzn', name: 'Bozeman/Yellowstone' }, // 4
	{ id: 'cun', name: 'Cancun' }, // 2
	{ id: 'den', name: 'Denver' }, //
	{ id: 'e38', name: 'Alpine' }, // 1
	{ id: 'gua', name: 'Guatemala City' }, // 1
	{ id: 'jac', name: 'Jackson Hole' }, // 3
	{ id: 'jfk', name: 'New York' }, //
	{ id: 'las', name: 'Las Vegas' }, // 2
	{ id: 'mco', name: 'Orlando' }, // 1
	{ id: 'mia', name: 'Miami' }, //
	{ id: 'mex', name: 'Mexico City' }, // 1
	{ id: 'msy', name: 'New Orleans' }, // 2
	{ id: 'ord', name: 'Chicago' }, //
	{ id: 'pdx', name: 'Portland' }, //
	{ id: 'phl', name: 'Philadelphia' }, // 1
	{ id: 'pvr', name: 'Puerto Vallarta' }, // 3
	{ id: 'rdu', name: 'Raleigh-Durham' }, // 1
	{ id: 'ric', name: 'Richmond' }, // 1
	{ id: 'san', name: 'San Diego' }, //
	{ id: 'sea', name: 'Seattle-Tacoma' }, //
	{ id: 'sjc', name: 'San Jose' }, //
	{ id: 'sjd', name: 'Los Cabos' }, // 2
	{ id: 'sjo', name: 'San José' }, // 1
	{ id: 'slc', name: 'Salt Lake City' }, // 3
	{ id: 'smf', name: 'Sacramento' }, // 3
	{ id: 'yul', name: 'Montréal' }, // 1
	{ id: 'yvr', name: 'Vancouver/' }, // 1
	{ id: 'yyz', name: 'Toronto' }, // 1
];

export const routes: RouteModel[] = [
	// jfk
	{ id: '1', flightNumber: 1, depart: 'aus', arrive: 'jfk', elevated: false },
	{ id: '2', flightNumber: 2, depart: 'jfk', arrive: 'aus', elevated: false },
	{
		id: '1000',
		flightNumber: 1000,
		depart: 'aus',
		arrive: 'jfk',
		elevated: true,
	},
	{
		id: '1001',
		flightNumber: 1001,
		depart: 'jfk',
		arrive: 'aus',
		elevated: true,
	},
	// ord
	{ id: '3', flightNumber: 3, depart: 'aus', arrive: 'ord', elevated: false },
	{ id: '4', flightNumber: 4, depart: 'ord', arrive: 'aus', elevated: false },
	{
		id: '1002',
		flightNumber: 1002,
		depart: 'aus',
		arrive: 'ord',
		elevated: true,
	},
	{
		id: '1003',
		flightNumber: 1003,
		depart: 'ord',
		arrive: 'aus',
		elevated: true,
	},
	// sjc
	{ id: '5', flightNumber: 5, depart: 'aus', arrive: 'sjc', elevated: false },
	{ id: '6', flightNumber: 6, depart: 'sjc', arrive: 'aus', elevated: false },
	{
		id: '1004',
		flightNumber: 1004,
		depart: 'aus',
		arrive: 'sjc',
		elevated: true,
	},
	{
		id: '1005',
		flightNumber: 1005,
		depart: 'sjc',
		arrive: 'aus',
		elevated: true,
	},
	// atl
	{ id: '5', flightNumber: 7, depart: 'aus', arrive: 'atl', elevated: false },
	{ id: '6', flightNumber: 8, depart: 'atl', arrive: 'aus', elevated: false },
	{
		id: '1006',
		flightNumber: 1006,
		depart: 'aus',
		arrive: 'atl',
		elevated: true,
	},
	{
		id: '1007',
		flightNumber: 1007,
		depart: 'atl',
		arrive: 'aus',
		elevated: true,
	},
	// mia
	{ id: '9', flightNumber: 9, depart: 'aus', arrive: 'mia', elevated: false },
	{ id: '10', flightNumber: 10, depart: 'mia', arrive: 'aus', elevated: false },
	{
		id: '1008',
		flightNumber: 1008,
		depart: 'aus',
		arrive: 'mia',
		elevated: true,
	},
	{
		id: '1009',
		flightNumber: 1009,
		depart: 'mia',
		arrive: 'aus',
		elevated: true,
	},
	// sea
	{ id: '11', flightNumber: 11, depart: 'aus', arrive: 'sea', elevated: false },
	{ id: '12', flightNumber: 12, depart: 'sea', arrive: 'aus', elevated: false },
	{
		id: '1010',
		flightNumber: 1010,
		depart: 'aus',
		arrive: 'sea',
		elevated: true,
	},
	{
		id: '1011',
		flightNumber: 1011,
		depart: 'sea',
		arrive: 'aus',
		elevated: true,
	},
	// pdx
	{ id: '13', flightNumber: 13, depart: 'aus', arrive: 'pdx', elevated: false },
	{ id: '14', flightNumber: 14, depart: 'pdx', arrive: 'aus', elevated: false },
	{
		id: '1012',
		flightNumber: 1012,
		depart: 'aus',
		arrive: 'pdx',
		elevated: true,
	},
	{
		id: '1013',
		flightNumber: 1013,
		depart: 'pdx',
		arrive: 'aus',
		elevated: true,
	},
	// bur
	{ id: '15', flightNumber: 15, depart: 'aus', arrive: 'bur', elevated: false },
	{ id: '16', flightNumber: 16, depart: 'bur', arrive: 'aus', elevated: false },
	{
		id: '1014',
		flightNumber: 1014,
		depart: 'aus',
		arrive: 'bur',
		elevated: true,
	},
	{
		id: '1015',
		flightNumber: 1015,
		depart: 'bur',
		arrive: 'aus',
		elevated: true,
	},
	// san
	{ id: '17', flightNumber: 17, depart: 'aus', arrive: 'bur', elevated: false },
	{ id: '18', flightNumber: 18, depart: 'bur', arrive: 'aus', elevated: false },
	{
		id: '1016',
		flightNumber: 1016,
		depart: 'aus',
		arrive: 'bur',
		elevated: true,
	},
	{
		id: '1017',
		flightNumber: 1017,
		depart: 'bur',
		arrive: 'aus',
		elevated: true,
	},
	// den
	{ id: '19', flightNumber: 19, depart: 'aus', arrive: 'den', elevated: false },
	{ id: '20', flightNumber: 20, depart: 'den', arrive: 'aus', elevated: false },
	{
		id: '1018',
		flightNumber: 1018,
		depart: 'aus',
		arrive: 'den',
		elevated: true,
	},
	{
		id: '1019',
		flightNumber: 1019,
		depart: 'den',
		arrive: 'aus',
		elevated: true,
	},
	// bos
	{ id: '21', flightNumber: 21, depart: 'aus', arrive: 'bos', elevated: false },
	{ id: '22', flightNumber: 22, depart: 'bos', arrive: 'aus', elevated: false },
	{
		id: '1020',
		flightNumber: 1020,
		depart: 'aus',
		arrive: 'bos',
		elevated: true,
	},
	{
		id: '1021',
		flightNumber: 1021,
		depart: 'bos',
		arrive: 'aus',
		elevated: true,
	},
	// mco
	{ id: '23', flightNumber: 23, depart: 'aus', arrive: 'mco', elevated: false },
	{ id: '24', flightNumber: 24, depart: 'mco', arrive: 'aus', elevated: false },
	// bna
	{ id: '25', flightNumber: 25, depart: 'aus', arrive: 'mco', elevated: false },
	{ id: '26', flightNumber: 26, depart: 'mco', arrive: 'aus', elevated: false },
	// phl
	{ id: '27', flightNumber: 27, depart: 'aus', arrive: 'phl', elevated: false },
	{ id: '28', flightNumber: 28, depart: 'phl', arrive: 'aus', elevated: false },
	// abq
	{ id: '29', flightNumber: 29, depart: 'aus', arrive: 'abq', elevated: false },
	{ id: '30', flightNumber: 30, depart: 'abq', arrive: 'aus', elevated: false },
	// rdu
	{ id: '31', flightNumber: 31, depart: 'aus', arrive: 'rdu', elevated: false },
	{ id: '32', flightNumber: 32, depart: 'rdu', arrive: 'aus', elevated: false },
	// ric
	{ id: '33', flightNumber: 33, depart: 'aus', arrive: 'ric', elevated: false },
	{ id: '34', flightNumber: 34, depart: 'ric', arrive: 'aus', elevated: false },
	// e38
	{ id: '35', flightNumber: 35, depart: 'aus', arrive: 'e38', elevated: false },
	{ id: '36', flightNumber: 36, depart: 'e38', arrive: 'aus', elevated: false },
	// yvr
	{ id: '37', flightNumber: 37, depart: 'aus', arrive: 'yvr', elevated: false },
	{ id: '38', flightNumber: 38, depart: 'yvr', arrive: 'aus', elevated: false },
	// yyz
	{ id: '39', flightNumber: 39, depart: 'aus', arrive: 'yyz', elevated: false },
	{ id: '40', flightNumber: 40, depart: 'yyz', arrive: 'aus', elevated: false },
	// yul
	{ id: '41', flightNumber: 41, depart: 'aus', arrive: 'yul', elevated: false },
	{ id: '42', flightNumber: 42, depart: 'yul', arrive: 'aus', elevated: false },
	// sjo
	{ id: '43', flightNumber: 43, depart: 'aus', arrive: 'sjo', elevated: false },
	{ id: '44', flightNumber: 44, depart: 'sjo', arrive: 'aus', elevated: false },
	// gua
	{ id: '45', flightNumber: 45, depart: 'aus', arrive: 'gua', elevated: false },
	{ id: '46', flightNumber: 46, depart: 'gua', arrive: 'aus', elevated: false },
	// mex
	{ id: '47', flightNumber: 47, depart: 'aus', arrive: 'mex', elevated: false },
	{ id: '48', flightNumber: 48, depart: 'mex', arrive: 'aus', elevated: false },
	// las
	{
		id: '1022',
		flightNumber: 1022,
		depart: 'aus',
		arrive: 'las',
		elevated: true,
	},
	{
		id: '1023',
		flightNumber: 1023,
		depart: 'las',
		arrive: 'aus',
		elevated: true,
	},
	// cun
	{
		id: '1024',
		flightNumber: 1024,
		depart: 'aus',
		arrive: 'cun',
		elevated: true,
	},
	{
		id: '1025',
		flightNumber: 1025,
		depart: 'cun',
		arrive: 'aus',
		elevated: true,
	},
	// sjd
	{
		id: '1026',
		flightNumber: 1026,
		depart: 'aus',
		arrive: 'sjd',
		elevated: true,
	},
	{
		id: '1027',
		flightNumber: 1027,
		depart: 'sjd',
		arrive: 'aus',
		elevated: true,
	},
	// msy
	{
		id: '1028',
		flightNumber: 1028,
		depart: 'aus',
		arrive: 'msy',
		elevated: true,
	},
	{
		id: '1029',
		flightNumber: 1029,
		depart: 'msy',
		arrive: 'aus',
		elevated: true,
	},
	// bze
	{
		id: '2000',
		flightNumber: 2000,
		depart: 'aus',
		arrive: 'bze',
		elevated: false,
		seasonal: 'summer',
	},
	{
		id: '2001',
		flightNumber: 2001,
		depart: 'bze',
		arrive: 'aus',
		elevated: false,
		seasonal: 'summer',
	},
	// bzn
	{
		id: '2002',
		flightNumber: 2002,
		depart: 'aus',
		arrive: 'bzn',
		elevated: true,
		seasonal: 'winter',
	},
	{
		id: '2003',
		flightNumber: 2003,
		depart: 'bzn',
		arrive: 'aus',
		elevated: true,
		seasonal: 'winter',
	},
	// jac
	{
		id: '2004',
		flightNumber: 2004,
		depart: 'aus',
		arrive: 'jac',
		elevated: true,
		seasonal: 'winter',
	},
	{
		id: '2005',
		flightNumber: 2005,
		depart: 'jac',
		arrive: 'aus',
		elevated: true,
		seasonal: 'winter',
	},
	// slc
	{
		id: '2006',
		flightNumber: 2006,
		depart: 'aus',
		arrive: 'slc',
		elevated: false,
		seasonal: 'winter',
	},
	{
		id: '2007',
		flightNumber: 2007,
		depart: 'slc',
		arrive: 'aus',
		elevated: false,
		seasonal: 'winter',
	},
	// smf
	{
		id: '2008',
		flightNumber: 2008,
		depart: 'aus',
		arrive: 'smf',
		elevated: false,
		seasonal: 'winter',
	},
	{
		id: '2008',
		flightNumber: 2008,
		depart: 'smf',
		arrive: 'aus',
		elevated: false,
		seasonal: 'winter',
	},
	// pvr
	{
		id: '2009',
		flightNumber: 2009,
		depart: 'aus',
		arrive: 'pvr',
		elevated: true,
		seasonal: 'summer',
	},
	{
		id: '2010',
		flightNumber: 2010,
		depart: 'pvr',
		arrive: 'aus',
		elevated: true,
		seasonal: 'summer',
	},
];

export const coordinates: CoordinateModel[] = [
	{ id: 'aus', lat: 30.11, lng: -97.4 },
	{ id: 'abq', lat: 35.02, lng: -106.36 },
	{ id: 'atl', lat: 33.38, lng: -84.25 },
	{ lat: 36.07, lng: -86.4, id: 'bna' },
	{ lat: 42.21, lng: -71, id: 'bos' },
	{ lat: 34.12, lng: -118.21, id: 'bur' },
	{ lat: 17.32, lng: -88.18, id: 'bze' },
	{ lat: 45.77, lng: -111.15, id: 'bzn' },
	{ lat: 21.02, lng: -86.52, id: 'cun' },
	{ lat: 39.51, lng: -104.4, id: 'den' },
	{ lat: 30.38, lng: -103.68, id: 'e38' },
	{ lat: 14.34, lng: -90.31, id: 'gua' },
	{ lat: 43.36, lng: -110.44, id: 'jac' },
	{ lat: 40.38, lng: -73.46, id: 'jfk' },
	{ lat: 36.04, lng: -115.09, id: 'las' },
	{ lat: 10.35, lng: -85.32, id: 'lir' },
	{ lat: 28.25, lng: -81.18, id: 'mco' },
	{ lat: 25.47, lng: -80.17, id: 'mia' },
	{ lat: 19.26, lng: -99.04, id: 'mex' },
	{ lat: 29.59, lng: -90.15, id: 'msy' },
	{ lat: 41.58, lng: -87.54, id: 'ord' },
	{ lat: 45.35, lng: -122.35, id: 'pdx' },
	{ lat: 39.52, lng: -75.14, id: 'phl' },
	{ lat: 20.4, lng: -105.15, id: 'pvr' },
	{ lat: 35.52, lng: -78.47, id: 'rdu' },
	{ lat: 37.3, lng: -77.2, id: 'ric' },
	{ lat: 32.44, lng: -117.11, id: 'san' },
	{ lat: 32.07, lng: -81.12, id: 'sav' },
	{ lat: 47.26, lng: -122.18, id: 'sea' },
	{ lat: 37.21, lng: -121.55, id: 'sjc' },
	{ lat: 23.09, lng: -109.43, id: 'sjd' },
	{ lat: 9.59, lng: -84.12, id: 'sjo' },
	{ lat: 40.47, lng: -111.58, id: 'slc' },
	{ lat: 38.41, lng: -121.35, id: 'smf' },
	{ lat: 45.28, lng: -73.44, id: 'yul' },
	{ lat: 49.11, lng: -123.11, id: 'yvr' },
	{ lat: 43.4, lng: -79.37, id: 'yyz' },
];
