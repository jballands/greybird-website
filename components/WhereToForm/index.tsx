import type { FindCityQuery } from '../../graphql/gen/graphql';

import React, { useState, FormEvent } from 'react';
import useSWR from 'swr';
import { useHomepage } from '../HomepageContext';
import useGraphQL from '../useGraphQL';
import styles from './WhereToForm.module.css';
import WhereToFormInput from './WhereToFormInput';

// const findCityQuery = /* GraphQL */ `
// 	query findCity($search: String) {
// 		destinations(filter: { id: $search, name: $search }) {
// 			id
// 			name
// 		}
// 	}
// `;

// const findCityWithConstraintsQuery = /* GraphQL */ `
// 	query findCityWithConstraints($search: String, $depart: ID, $arrive: ID) {
// 		routes
// 	}
// `;

function WhereToForm() {
	const { setDepartingAirport, setArrivingAirport } = useHomepage();

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
				placeholder="Depart"
				onSelectDestination={handleSelectDepart}
			/>
			<WhereToFormInput
				id="arrive"
				placeholder="Arrive"
				onSelectDestination={handleSelectArrive}
			/>
		</div>
	);
}

export default WhereToForm;
