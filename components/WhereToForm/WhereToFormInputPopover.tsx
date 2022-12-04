import React from 'react';
import type { FindCityQuery } from '../../graphql/gen/graphql';
import styles from './WhereToFormInputPopover.module.css';

type FindCityQueryDestinations = FindCityQuery['destinations'];

interface WhereToFormInputPopoverProps {
	results?: FindCityQueryDestinations;
}

function WhereToFormInputPopover({ results }: WhereToFormInputPopoverProps) {
	if (!results) {
		return <div>No results</div>;
	}

	const handleClick = (destination: any) => {
		console.dir(destination);
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
