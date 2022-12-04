import type {
	FindCityQuery,
	FindCityQueryVariables,
} from '../../graphql/gen/graphql';

import React, { useState, FormEvent, FocusEvent } from 'react';
import useGraphQL from '../useGraphQL';
import WhereToFormInputPopover from './WhereToFormInputPopover';
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
	const [isFocused, setIsFocused] = useState(false);

	const { data, isValidating } = useGraphQL<
		FindCityQuery,
		FindCityQueryVariables
	>(
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

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
	};

	const canShowResults = (departTextInput?.length ?? -1) >= 3 && !isValidating;

	return (
		<div className={styles.container} onBlur={handleBlur} tabIndex={0}>
			<input
				className={styles.input}
				placeholder={placeholder}
				value={departTextInput}
				onChange={handleInputChange}
				onFocus={handleFocus}
			/>

			<div className={styles.popoverContainer}>
				{isValidating && <div className={styles.loadingBar} />}
				{canShowResults && (
					<WhereToFormInputPopover results={data?.destinations} />
				)}
			</div>
		</div>
	);
}

export default WhereToFormInput;
