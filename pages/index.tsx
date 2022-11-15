import React, { Suspense, forwardRef } from 'react';
import Globe from '../components/Globe';
import styles from '../styles/Index.module.css';

function destinations() {
	return (
		<main>
			<div className={styles.globeContainer}>
				<Globe />
			</div>
		</main>
	);
}

export default destinations;
