import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import type { Coordinate } from '../graphql/gen/graphql';
import type { HomepageContext } from './HomepageContext';

import dynamic from 'next/dynamic';
import React, {
	Suspense,
	useEffect,
	useState,
	useRef,
	useContext,
	useCallback,
} from 'react';
import ReactGlobeGL from 'react-globe.gl';
import { useResizeDetector } from 'react-resize-detector';
import styles from './Globe.module.css';
import { useHomepage } from './HomepageContext';

// const ReactGlobeGL = dynamic(() => import('react-globe.gl'));

interface CameraCoordinates {
	altitude: number;
	lat: number;
	lng: number;
}

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
	start: { lat: number; lng: number },
	end: { lat: number; lng: number },
	color: string | string[],
	animateTimeMs = 0,
	dashLength: number = 1,
	dashGap = 0
): Arc => ({
	startLat: start.lat,
	startLng: start.lng,
	endLat: end.lat,
	endLng: end.lng,
	color,
	animateTimeMs,
	dashLength,
	dashGap,
});

const getInitialArcs = (initialRoutes: HomepageContext['routes']) => {
	return initialRoutes.map(route => {
		return makeArc(
			route.depart.coordinate,
			route.arrive.coordinate,
			[`rgba(55, 77, 117, 1)`, `rgba(55, 77, 117, 0.25)`],
			30000,
			0.1,
			0.5
		);
	});
};

const DEFAULT_CAMERA_COORDINATES: CameraCoordinates = {
	altitude: 1,
	lat: 22.51,
	lng: -81.43,
};

function Globe() {
	const globeRef = useRef<GlobeMethods>();

	const [arcs, setArcs] = useState<Arc[]>();

	const { departingAirport, arrivingAirport, routes, isValidatingRoutes } =
		useHomepage();

	const noDefinedRoute = !departingAirport || !arrivingAirport;

	const lookAt = useCallback(
		(coordinates: CameraCoordinates, animateMs = 750) => {
			globeRef.current?.pointOfView(coordinates, animateMs);
		},
		[]
	);

	// This effect disables the controls
	useEffect(() => {
		if (globeRef.current) {
			globeRef.current.controls().enabled = false;
		}
	}, []);

	// This effect sets the initial arcs, if necessary
	useEffect(() => {
		if (noDefinedRoute && (arcs?.length ?? -1) < 2) {
			setArcs(getInitialArcs(routes));

			// Set the point of view
			lookAt(DEFAULT_CAMERA_COORDINATES);
		}
	}, [routes, arcs?.length, noDefinedRoute, lookAt]);

	// This effect sets up the defined route if it can
	useEffect(() => {
		if (!noDefinedRoute && (arcs?.length ?? -1) > 1 && !isValidatingRoutes) {
			const route = routes[0];

			const depart = route.depart;
			const arrive = route.arrive;

			setArcs([
				makeArc(
					depart.coordinate,
					arrive.coordinate,
					['#FFC300', '#C70039'],
					1
				),
			]);

			// Set the point of view
			lookAt({
				altitude: 0.5,
				lat: (arrive.coordinate.lat + depart.coordinate.lat) / 2,
				lng: (arrive.coordinate.lng + depart.coordinate.lng) / 2 + 12,
			});
		}
	}, [arcs?.length, isValidatingRoutes, lookAt, noDefinedRoute, routes]);

	const { width, height, ref: resizeDetectorRef } = useResizeDetector();

	return (
		<div className={styles.container} ref={resizeDetectorRef}>
			<Suspense>
				<ReactGlobeGL
					ref={globeRef}
					width={width}
					height={height}
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
					onGlobeReady={() => lookAt(DEFAULT_CAMERA_COORDINATES, 0)}
				/>
			</Suspense>
		</div>
	);
}

export default Globe;
