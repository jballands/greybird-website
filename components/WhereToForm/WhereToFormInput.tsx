import type {
	FindCityWithConstraintsQuery,
	FindCityWithConstraintsQueryVariables,
} from '../../graphql/gen/graphql';

import React, { useEffect, useState, FormEvent, FocusEvent } from 'react';
import useGraphQL from '../useGraphQL';
import WhereToFormInputPill from './WhereToFormInputPill';
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

type Destination = FindCityWithConstraintsQuery['destinations'][0];

interface WhereToFormInputProps {
	constraint?: string;
	destination?: Destination;
	placeholder: string;
	onSelectDestination: (destination?: Destination) => unknown;
}

function WhereToFormInput({
	constraint,
	placeholder,
	destination,
	onSelectDestination,
}: WhereToFormInputProps) {
	const [textInput, setTextInput] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);

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

	const handleDestinationClick = (destination: Destination) => {
		onSelectDestination(destination);
		setIsFocused(false);
	};

	const handleClearInput = () => {
		onSelectDestination(undefined);
		setTextInput('');
	};

	const canShowResults = (textInput?.length ?? -1) >= 3 && isFocused;

	return (
		<div className={styles.container} onBlur={handleBlur}>
			<div className={styles.pseudoInput}>
				{destination && (
					<WhereToFormInputPill
						value={destination.name}
						onClear={handleClearInput}
					/>
				)}
				{!destination && (
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
