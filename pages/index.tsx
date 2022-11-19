import React, { Suspense, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Index.module.css';
import WhereToForm from '../components/WhereToForm';
import { HomepageContext } from '../components/HomepageContext';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

function destinations() {
	return (
		<HomepageContext>
			<main>
				<div className={styles.globeContainer}>
					<Globe />
					<div className={styles.whereToContainer}>
						<WhereToForm />
					</div>
				</div>
			</main>
		</HomepageContext>
	);
}

export default destinations;
