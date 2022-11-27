import type {
	FindCityQuery,
	FindCityQueryVariables,
} from '../../graphql/gen/graphql';

import React, { useState, FormEvent } from 'react';
import useSWR from 'swr';
import { useHomepage } from '../HomepageContext';
import useGraphQL from '../useGraphQL';
import styles from './WhereToForm.module.css';
import WhereToFormInput from './WhereToFormInput';

const findCityQuery = /* GraphQL */ `
	query findCity($search: String) {
		destinations(name: $search) {
			id
			name
		}
	}
`;

function WhereToForm() {
	const { setDeparting, setArriving } = useHomepage();

	return (
		<div className={styles.container}>
			<h1>Where are we going?</h1>
			<WhereToFormInput placeholder="Depart" />
		</div>
	);
}

export default WhereToForm;
