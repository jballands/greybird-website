import type { FindCityWithConstraintsQuery } from '../../graphql/gen/graphql';

import React, { FormEvent } from 'react';
import useSWR from 'swr';
import { useHomepage } from '../HomepageContext';
import useGraphQL from '../useGraphQL';
import styles from './WhereToForm.module.css';
import WhereToFormInput from './WhereToFormInput';
import WhereToFormRouteSelection from './WhereToFormRouteSelection';

type Destination = FindCityWithConstraintsQuery['destinations'][0];

function WhereToForm() {
	const {
		departingAirport,
		setDepartingAirport,
		arrivingAirport,
		setArrivingAirport,
	} = useHomepage();

	const handleSelectDepart = (airport?: Destination) => {
		setDepartingAirport(airport);
	};

	const handleSelectArrive = (airport?: Destination) => {
		setArrivingAirport(airport);
	};

	return (
		<>
			<h1>Where are we going?</h1>
			<WhereToFormInput
				constraint={arrivingAirport?.id}
				placeholder="Depart"
				destination={departingAirport}
				onSelectDestination={handleSelectDepart}
			/>
			<WhereToFormInput
				constraint={departingAirport?.id}
				placeholder="Arrive"
				destination={arrivingAirport}
				onSelectDestination={handleSelectArrive}
			/>

			<WhereToFormRouteSelection />
		</>
	);
}

export default WhereToForm;
