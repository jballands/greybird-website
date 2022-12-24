import React from 'react';
import Image from 'next/image';
import styles from './WhereToFormInputPill.module.css';

interface WhereToFormInputPillProps {
	value: String;
	onClear: () => unknown;
}

function WhereToFormInputPill({ value, onClear }: WhereToFormInputPillProps) {
	return (
		<div className={styles.container}>
			<div className={styles.pill}>
				{value}
				<button className={styles.pillClear} onClick={onClear}>
					<Image
						src="/close-icon.svg"
						alt="Greybird logo"
						width="20"
						height="20"
					/>
				</button>
			</div>
		</div>
	);
}

export default WhereToFormInputPill;
