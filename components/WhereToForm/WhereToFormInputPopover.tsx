import type { FindCityQuery } from '../../graphql/gen/graphql';

import React from 'react';
import styles from './WhereToFormInputPopover.module.css';

type FindCityQueryDestinations = FindCityQuery['destinations'];

interface WhereToFormInputPopoverProps {
	results?: FindCityQueryDestinations;
	onDestinationClick: (destination: FindCityQueryDestinations[0]) => unknown;
}

function WhereToFormInputPopover({
	results,
	onDestinationClick,
}: WhereToFormInputPopoverProps) {
	if (!results) {
		return null;
	}

	const handleClick = (destination: FindCityQueryDestinations[0]) => {
		onDestinationClick(destination);
	};

	return (
		<>
			{results.map(destination => (
				<button
					className={styles.container}
					key={destination.id}
					onClick={() => handleClick(destination)}
				>
					<span className={styles.name}>{destination.name}</span>
					<span className={styles.id}>{destination.id}</span>
				</button>
			))}
		</>
	);
}

export default WhereToFormInputPopover;
