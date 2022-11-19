import React, { Suspense, useEffect, useState, useRef } from 'react';
import ReactGlobeGL, { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { City, destinations, austin } from './globeLandmarks';
import { useHomepage } from './HomepageContext';

interface Arc {
	startLat: number;
	startLng: number;
	endLat: number;
	endLng: number;
}

const makeArc = (start: City, end: City): Arc => ({
	startLat: start.coordinates.lat,
	startLng: start.coordinates.lng,
	endLat: end.coordinates.lat,
	endLng: end.coordinates.lng,
});

const getInitialArcs = () => {
	return Object.entries(destinations).map(([_, city]) => {
		return makeArc(austin, city);
	});
};

function Globe() {
	const globeRef = useRef<GlobeMethods>();
	const [arcs, setArcs] = useState<Arc[]>(() => getInitialArcs());

	const { connection } = useHomepage();

	useEffect(() => {
		if (!connection) {
			return;
		}

		const [depart, arrive] = connection;
		setArcs([makeArc(depart, arrive)]);

		// Set the point of view
		globeRef.current?.pointOfView(
			{
				altitude: 0.5,
				lat: (arrive.coordinates.lat + depart.coordinates.lat) / 2,
				lng: (arrive.coordinates.lng + depart.coordinates.lng) / 2,
			},
			1000
		);
	}, [connection]);

	return (
		<Suspense>
			<ReactGlobeGL
				ref={globeRef}
				animateIn={false}
				globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
				arcsData={arcs}
				arcDashInitialGap={() => Math.random()}
				arcColor={() => [`rgba(55, 77, 117, 1)`, `rgba(55, 77, 117, 0.25)`]}
				arcDashLength={0.1}
				arcDashGap={0.5}
				arcDashAnimateTime={30000}
				onGlobeReady={() => {
					globeRef.current?.pointOfView({
						altitude: 1,
						lat: 22.51,
						lng: -81.43,
					});
				}}
			/>
		</Suspense>
	);
}

export default Globe;
