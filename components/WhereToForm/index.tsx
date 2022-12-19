import React, { useCallback, useState, FormEvent } from 'react';
import useSWR from 'swr';
import { useHomepage } from '../HomepageContext';
import useGraphQL from '../useGraphQL';
import styles from './WhereToForm.module.css';
import WhereToFormInput from './WhereToFormInput';

function WhereToForm() {
	const {
		departingAirport,
		setDepartingAirport,
		arrivingAirport,
		setArrivingAirport,
	} = useHomepage();

	const handleSelectDepart = (airportId?: string) => {
		setDepartingAirport(airportId);
	};

	const handleSelectArrive = (airportId?: string) => {
		setArrivingAirport(airportId);
	};

	return (
		<div className={styles.container}>
			<h1>Where are we going?</h1>
			<WhereToFormInput
				id="depart"
				constraintId="arrive"
				constraint={arrivingAirport}
				placeholder="Depart"
				onSelectDestination={handleSelectDepart}
			/>
			<WhereToFormInput
				id="arrive"
				constraintId="depart"
				constraint={departingAirport}
				placeholder="Arrive"
				onSelectDestination={handleSelectArrive}
			/>
		</div>
	);
}

export default WhereToForm;
