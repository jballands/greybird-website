import React, { Suspense, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Index.module.css';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

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
