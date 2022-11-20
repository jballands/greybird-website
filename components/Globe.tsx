import React, { Suspense, useEffect, useState, useRef } from 'react';
import ReactGlobeGL, { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { City, destinations, austin } from './globeLandmarks';
import { useHomepage } from './HomepageContext';

interface Arc {
	startLat: number;
	startLng: number;
	endLat: number;
	endLng: number;
	color: string | string[];
	dashLength: number;
	dashGap: number;
	animateTimeMs: number;
}

const makeArc = (
	start: City,
	end: City,
	color: string | string[],
	animateTimeMs = 0,
	dashLength: number = 1,
	dashGap = 0
): Arc => ({
	startLat: start.coordinates.lat,
	startLng: start.coordinates.lng,
	endLat: end.coordinates.lat,
	endLng: end.coordinates.lng,
	color,
	animateTimeMs,
	dashLength,
	dashGap,
});

const getInitialArcs = () => {
	return Object.entries(destinations).map(([_, city]) => {
		return makeArc(
			austin,
			city,
			[`rgba(55, 77, 117, 1)`, `rgba(55, 77, 117, 0.25)`],
			30000,
			0.1,
			0.5
		);
	});
};

function Globe() {
	const globeRef = useRef<GlobeMethods>();
	const [arcs, setArcs] = useState<Arc[]>(() => getInitialArcs());

	const { connection } = useHomepage();

	useEffect(() => {
		if (globeRef.current) {
			globeRef.current.controls().enabled = false;
		}
	}, []);

	useEffect(() => {
		if (!connection) {
			return;
		}

		const [depart, arrive] = connection;
		setArcs([makeArc(depart, arrive, ['#FFC300', '#C70039'], 1)]);

		// Set the point of view
		if (globeRef.current) {
			globeRef.current?.pointOfView(
				{
					altitude: 0.5,
					lat: (arrive.coordinates.lat + depart.coordinates.lat) / 2,
					lng: (arrive.coordinates.lng + depart.coordinates.lng) / 2 + 12,
				},
				500
			);
		}
	}, [connection]);

	return (
		<Suspense>
			<ReactGlobeGL
				ref={globeRef}
				animateIn={false}
				globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
				arcsData={arcs}
				arcDashInitialGap={() => Math.random()}
				arcColor="color"
				arcDashLength="dashLength"
				arcDashGap="dashGap"
				arcDashAnimateTime="animateTimeMs"
				arcStroke={0.1}
				arcsTransitionDuration={250}
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
