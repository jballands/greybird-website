import type {
	FindCityQuery,
	FindCityQueryVariables,
} from '../../graphql/gen/graphql';

import React, { useState, FormEvent } from 'react';
import useGraphQL from '../useGraphQL';
import styles from './WhereToFormInput.module.css';

const findCityQuery = /* GraphQL */ `
	query findCity($search: String) {
		destinations(name: $search) {
			id
			name
		}
	}
`;

interface WhereToFormInputProps {
	placeholder: string;
}

function WhereToFormInput({ placeholder }: WhereToFormInputProps) {
	const [departTextInput, setDepartTextInput] = useState<string>('');

	const { data } = useGraphQL<FindCityQuery, FindCityQueryVariables>(
		'findCity',
		() => {
			return (departTextInput?.length ?? -1) >= 3 ? findCityQuery : undefined;
		},
		{
			search: departTextInput,
		}
	);

	const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setDepartTextInput(value);
	};

	return (
		<div className={styles.container}>
			<input
				className={styles.input}
				placeholder={placeholder}
				value={departTextInput}
				onChange={handleInputChange}
			/>
			{(departTextInput?.length ?? -1) >= 3 && (
				<div className={styles.popoverContainer}>
					<div className={styles.popover}>Floating</div>
				</div>
			)}
		</div>
	);
}

export default WhereToFormInput;
