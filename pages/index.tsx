import React, { Suspense, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { HomepageContext } from '../components/HomepageContext';
import HomepageForm from '../components/HomepageForm';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

function destinations() {
	return (
		<HomepageContext>
			<main>
				<Globe />
				<HomepageForm />
			</main>
		</HomepageContext>
	);
}

export default destinations;
