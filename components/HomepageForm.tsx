import React from 'react';
import { useHomepage } from './HomepageContext';
import RouteRefinement from './RouteRefinement';
import WhereToForm from './WhereToForm';
import styles from './HomepageForm.module.css';

function HomepageForm() {
	const { selectedRoute } = useHomepage();

	if (!selectedRoute) {
		return (
			<div className={styles.container}>
				<WhereToForm />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<RouteRefinement />
		</div>
	);
}

export default HomepageForm;
