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

	if (destinations.length <= 0) {
		return (
			<div className={styles.container}>
				<span className={styles.noResults}>No Results</span>
				<span className={styles.noResultsExplaination}>
					Try searching for a different city.
				</span>
			</div>
		);
	}

	const handleClick = (
		destination: FindCityWithConstraintsQuery['destinations'][0]
	) => {
		onDestinationClick(destination);
	};

	return (
		<div className={styles.container}>
			{destinations.map(destination => {
				return (
					<button
						className={styles.button}
						key={destination.id}
						onClick={() => handleClick(destination)}
					>
						<span className={styles.name}>{destination.name}</span>
						<span className={styles.id}>{destination.id}</span>
					</button>
				);
			})}
		</div>
	);
}

export default WhereToFormInputPopover;
