import type { FindCityWithConstraintsQuery } from '../../graphql/gen/graphql';

import React from 'react';
import styles from './WhereToFormInputPopover.module.css';

type FindCityQueryRoutes = FindCityWithConstraintsQuery['routes'];
type FindCityQueryDestination = FindCityQueryRoutes[0]['depart'];

interface WhereToFormInputPopoverProps {
	id: 'depart' | 'arrive';
	routes?: FindCityQueryRoutes;
	onDestinationClick: (destination: FindCityQueryDestination) => unknown;
}

function WhereToFormInputPopover({
	id,
	routes,
	onDestinationClick,
}: WhereToFormInputPopoverProps) {
	if (!routes) {
		return null;
	}

	const handleClick = (destination: FindCityQueryDestination) => {
		onDestinationClick(destination);
	};

	return (
		<>
			{routes.map(route => {
				const destination = route[id];

				return (
					<button
						className={styles.container}
						key={destination.id}
						onClick={() => handleClick(destination)}
					>
						<span className={styles.name}>{destination.name}</span>
						<span className={styles.id}>{destination.id}</span>
					</button>
				);
			})}
		</>
	);
}

export default WhereToFormInputPopover;
