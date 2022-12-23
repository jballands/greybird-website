import type { FindCityWithConstraintsQuery } from '../../graphql/gen/graphql';

import React, { useMemo } from 'react';
import styles from './WhereToFormInputPopover.module.css';

interface WhereToFormInputPopoverProps {
	destinations?: FindCityWithConstraintsQuery['destinations'];
	onDestinationClick: (
		destination: FindCityWithConstraintsQuery['destinations'][0]
	) => unknown;
}

function WhereToFormInputPopover({
	destinations,
	onDestinationClick,
}: WhereToFormInputPopoverProps) {
	if (!destinations) {
		return null;
	}

	const handleClick = (
		destination: FindCityWithConstraintsQuery['destinations'][0]
	) => {
		onDestinationClick(destination);
	};

	return (
		<>
			{destinations.map(destination => {
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
