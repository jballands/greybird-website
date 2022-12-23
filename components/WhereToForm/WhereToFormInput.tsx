import type {
	FindCityWithConstraintsQuery,
	FindCityWithConstraintsQueryVariables,
} from '../../graphql/gen/graphql';

import React, { useEffect, useState, FormEvent, FocusEvent } from 'react';
import useGraphQL from '../useGraphQL';
import WhereToFormInputPopover from './WhereToFormInputPopover';
import styles from './WhereToFormInput.module.css';

const findCityWithConstraintsQuery = /* GraphQL */ `
	query findCityWithConstraints($search: String, $connectsWith: ID) {
		destinations(
			filter: { code: $search, name: $search, connectsWithId: $connectsWith }
		) {
			id
			name
			code
		}
	}
`;

interface WhereToFormInputProps {
	constraint?: string;
	placeholder: string;
	onSelectDestination: (airportId?: string) => unknown;
}

function WhereToFormInput({
	constraint,
	placeholder,
	onSelectDestination,
}: WhereToFormInputProps) {
	const [textInput, setTextInput] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);
	const [pill, setPill] = useState<string | undefined>(undefined);

	const { data, isValidating } = useGraphQL<
		FindCityWithConstraintsQuery,
		FindCityWithConstraintsQueryVariables
	>(
		`findCityWithConstraints`,
		() => {
			return (textInput?.length ?? -1) >= 3
				? findCityWithConstraintsQuery
				: undefined;
		},
		// Dynamically fill in the variables based on the id and constraint props
		{
			search: textInput,
			connectsWith: constraint,
		}
	);

	const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setTextInput(value);
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
		destination: FindCityWithConstraintsQuery['destinations'][0]
	) => {
		onSelectDestination(destination.id);
		setPill(destination.name);
		setIsFocused(false);
	};

	const handleClearInput = () => {
		onSelectDestination(undefined);
		setTextInput('');
		setPill(undefined);
	};

	const canShowResults = (textInput?.length ?? -1) >= 3 && isFocused;

	return (
		<div className={styles.container} onBlur={handleBlur}>
			<div className={styles.pseudoInput}>
				{pill && (
					<div className={styles.pillContainer}>
						<div className={styles.pill}>{pill}</div>
						<button className={styles.pillClear} onClick={handleClearInput}>
							Clear
						</button>
					</div>
				)}
				{!pill && (
					<input
						className={styles.input}
						placeholder={placeholder}
						value={textInput}
						onChange={handleInputChange}
						onFocus={handleFocus}
					/>
				)}
			</div>

			<div className={styles.popoverContainer}>
				{isValidating && <div className={styles.loadingBar} />}
				{canShowResults && (
					<WhereToFormInputPopover
						destinations={data?.destinations}
						onDestinationClick={handleDestinationClick}
					/>
				)}
			</div>
		</div>
	);
}

export default WhereToFormInput;
