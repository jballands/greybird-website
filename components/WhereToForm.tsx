import React from 'react';
import useSWR from 'swr';
import { useHomepage } from './HomepageContext';
import styles from './WhereToForm.module.css';

function WhereToForm() {
	const { setDeparting, setArriving } = useHomepage();

	return (
		<div className={styles.container}>
			<h1>Where are we going?</h1>
			<input className={styles.cityInput} placeholder="Depart" />
			<input className={styles.cityInput} placeholder="Arrive" />
		</div>
	);
}

export default WhereToForm;
