import { StandardTextFieldProps, TextField } from '@material-ui/core';
import CustomAutocomplete from 'components/CustomAutocomplete';
import React, { useMemo, useState } from 'react';
import { AutocompleteOption } from 'types/inputField';

interface IRatingFieldProps {
	inputProps: Omit<StandardTextFieldProps, 'value' | 'onChange'>;
	fieldValue: number;
	setFieldValue: (fieldName: string, value: string) => void;
}

const MIN_RATING = 1;
const MAX_RATING = 6;

const RatingField: React.FunctionComponent<IRatingFieldProps> = props => {
	const { inputProps, fieldValue, setFieldValue } = props;

	const [ratingSelected, setRatingSelected] = useState<AutocompleteOption>(null);

	const ratingOptions: AutocompleteOption[] = useMemo(() => {
		//Initial option
		const options: AutocompleteOption[] = [];

		for (let i = MIN_RATING; i <= MAX_RATING; i++) {
			options.push({ label: i.toString(), value: i });
		}
		return options;
	}, [ratingSelected]);
	return (
		<CustomAutocomplete
			options={ratingOptions}
			optionSelected={ratingSelected}
			setOptionSelected={setRatingSelected}
			AutocompleteProps={{
				renderOption: (props, option) => <li {...props}>{option.label}</li>,
				isOptionEqualToValue: (option, value) => option.value === value.value,
				renderInput: params => <TextField {...params} fullWidth variant="outlined" {...inputProps} type={'number'} />,
			}}
			renderInputProps={{ ...inputProps, name: inputProps.name, setFieldValue }}
			fieldValue={fieldValue}
		/>
	);
};

export default RatingField;
