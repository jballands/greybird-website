import type { FetchRoutesQuery } from '../../../graphql/gen/graphql';

import React, { useCallback } from 'react';
import Image from 'next/image';
import styles from './WhereToFormRouteSelectionRoute.module.css';
import { useHomepage } from '../../HomepageContext';

type Route = FetchRoutesQuery['routes'][0];

interface WhereToFormRouteSelectionRouteProps {
	route: Route;
}

function WhereToFormRouteSelectionRoute({
	route,
}: WhereToFormRouteSelectionRouteProps) {
	const { setSelectedRoute } = useHomepage();

	const handleClick = useCallback(() => {
		setSelectedRoute(route);
	}, [route, setSelectedRoute]);

	return (
		<button className={styles.container} onClick={handleClick}>
			<div className={styles.flightNumber}>
				GRY
				<span className={styles.flightNumberBold}>{route.flightNumber}</span>
				{route.elevated && (
					<div className={styles.elevated}>
						<Image alt="Elevated flight" src="/elevated.svg" fill />
					</div>
				)}
			</div>

			<div className={styles.routing}>
				{route.depart.name} &#x2192; {route.arrive.name}
			</div>
		</button>
	);
}

export default WhereToFormRouteSelectionRoute;
