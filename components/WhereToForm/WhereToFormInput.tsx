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
		destinations(id: $search, name: $search) {
			id
			name
		}
	}
`;

interface WhereToFormInputProps {
	id: string;
	placeholder: string;
	onSelectDestination: (id: string) => unknown;
}

function WhereToFormInput({
	id,
	placeholder,
	onSelectDestination,
}: WhereToFormInputProps) {
	const [departTextInput, setDepartTextInput] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);

	const { data, isValidating } = useGraphQL<
		FindCityQuery,
		FindCityQueryVariables
	>(
		`findCity`,
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
		const currentTarget = e.currentTarget;

		requestAnimationFrame(() => {
			if (!currentTarget.contains(document.activeElement)) {
				setIsFocused(false);
			}
		});
	};

	const handleDestinationClick = (
		destination: FindCityQuery['destinations'][0]
	) => {
		onSelectDestination(destination.id);
		setIsFocused(false);
	};

	const canShowResults = (departTextInput?.length ?? -1) >= 3 && isFocused;

	return (
		<div className={styles.container} onBlur={handleBlur}>
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
					<WhereToFormInputPopover
						results={data?.destinations}
						onDestinationClick={handleDestinationClick}
					/>
				)}
			</div>
		</div>
	);
}

export default WhereToFormInput;
