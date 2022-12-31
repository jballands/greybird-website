import React, { useCallback } from 'react';
import { useHomepage } from '../HomepageContext';
import styles from './RouteRefinement.module.css';

function RouteRefinement() {
	const { setSelectedRoute } = useHomepage();

	const handleBack = useCallback(() => {
		setSelectedRoute(undefined);
	}, [setSelectedRoute]);

	return (
		<div className={styles.container}>
			<h1>Let&apos;s sort out some details.</h1>
			<button onClick={handleBack}>Go back</button>
		</div>
	);
}

export default RouteRefinement;
