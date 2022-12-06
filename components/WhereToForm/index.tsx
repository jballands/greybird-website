import type { FindCityQuery } from '../../graphql/gen/graphql';

import React, { useState, FormEvent } from 'react';
import useSWR from 'swr';
import { useHomepage } from '../HomepageContext';
import useGraphQL from '../useGraphQL';
import styles from './WhereToForm.module.css';
import WhereToFormInput from './WhereToFormInput';

function WhereToForm() {
	const { setDeparting, setArriving } = useHomepage();

	const handleSelectDepart = (id: string) => {
		setDeparting(id);
	};

	const handleSelectArrive = (id: string) => {
		setArriving(id);
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
				onSelectDestination={handleSelectDepart}
			/>
		</div>
	);
}

export default WhereToForm;
