import React from 'react';
import { useHomepage } from '../../HomepageContext';
import WhereToFormRouteSelectionRoute from './WhereToFormRouteSelectionRoute';
import styles from './WhereToFormRouteSelection.module.css';

function WhereToFormRouteSelection() {
	const { routes, arrivingAirport, departingAirport } = useHomepage();

	if (!departingAirport || !arrivingAirport) {
		return null;
	}

	const routesString = routes.length !== 1 ? 'flights' : 'flight';

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.searchResults}>
					{routes.length} {routesString} found
				</span>
				<span className={styles.selectAFlight}>Select a flight.</span>
			</div>
			{routes.map(route => (
				<WhereToFormRouteSelectionRoute key={route.id} route={route} />
			))}
		</div>
	);
}

export default WhereToFormRouteSelection;
