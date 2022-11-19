import React from 'react';
import { useHomepage } from './HomepageContext';
import { destinations, austin } from '../components/globeLandmarks';
import styles from './WhereToForm.module.css';

function WhereToForm() {
	const { setDeparting, setArriving } = useHomepage();

	const handleAusPdx = () => {
		setDeparting(austin);
		setArriving(destinations.pdx);
	};

	return (
		<div className={styles.container}>
			<h1>Where are we going?</h1>
			<form className={styles.form}>
				<button className={styles.button} type="button" onClick={handleAusPdx}>
					AUS to PDX
				</button>
			</form>
		</div>
	);
}

export default WhereToForm;
