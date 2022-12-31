import React, { Suspense, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import WhereToForm from '../components/WhereToForm';
import RouteSelection from '../components/RouteSelection';
import { HomepageContext } from '../components/HomepageContext';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

function destinations() {
	return (
		<HomepageContext>
			<main>
				<Globe />
				<WhereToForm />
			</main>
		</HomepageContext>
	);
}

export default destinations;
