import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import type {
	FetchGlobalCoordinatesQuery,
	FetchGlobalCoordinatesQueryVariables,
	Coordinate,
} from '../graphql/gen/graphql';

import dynamic from 'next/dynamic';
import React, {
	Suspense,
	useEffect,
	useState,
	useRef,
	useContext,
} from 'react';
import ReactGlobeGL from 'react-globe.gl';
import { useResizeDetector } from 'react-resize-detector';
import useGraphQL from './useGraphQL';
import styles from './Globe.module.css';
import { useHomepage } from './HomepageContext';

// const ReactGlobeGL = dynamic(() => import('react-globe.gl'));

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

const getInitialArcs = (initialRoutes: FetchGlobalCoordinatesQuery) => {
	return initialRoutes.routes.map(route => {
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

const globalCoordinatesQuery = /* GraphQL */ `
	query fetchGlobalCoordinates($depart: ID!, $arrive: ID) {
		routes(depart: $depart, arrive: $arrive) {
			depart {
				coordinate {
					lat
					lng
				}
			}
			arrive {
				coordinate {
					lat
					lng
				}
			}
		}
	}
`;

function Globe() {
	const globeRef = useRef<GlobeMethods>();

	const [arcs, setArcs] = useState<Arc[]>();

	const { connection } = useHomepage();

	const { data, error } = useGraphQL<
		FetchGlobalCoordinatesQuery,
		FetchGlobalCoordinatesQueryVariables
	>(`fetchGlobalCoordinates`, globalCoordinatesQuery, {
		depart: connection?.[0] ? connection[0] : 'aus',
		arrive: connection?.[1],
	});

	useEffect(() => {
		if (globeRef.current) {
			globeRef.current.controls().enabled = false;
		}
	}, []);

	const { width, height, ref: resizeDetectorRef } = useResizeDetector();

	useEffect(() => {
		if (data && connection && data.routes.length > 0) {
			const depart = data.routes[0].depart;
			const arrive = data.routes[0].arrive;

			setArcs([
				makeArc(
					depart.coordinate,
					arrive.coordinate,
					['#FFC300', '#C70039'],
					1
				),
			]);

			// Set the point of view
			if (globeRef.current) {
				globeRef.current?.pointOfView(
					{
						altitude: 0.5,
						lat: (arrive.coordinate.lat + depart.coordinate.lat) / 2,
						lng: (arrive.coordinate.lng + depart.coordinate.lng) / 2 + 12,
					},
					750
				);
			}
		} else if (data) {
			setArcs(getInitialArcs(data));

			if (globeRef.current) {
				globeRef.current?.pointOfView(
					{
						altitude: 1,
						lat: 22.51,
						lng: -81.43,
					},
					1000
				);
			}
		}
	}, [connection, data]);

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
					onGlobeReady={() => {
						globeRef.current?.pointOfView({
							altitude: 1,
							lat: 22.51,
							lng: -81.43,
						});
					}}
				/>
			</Suspense>
		</div>
	);
}

export default Globe;
