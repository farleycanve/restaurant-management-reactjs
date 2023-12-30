import { StandardTextFieldProps, TextField } from '@material-ui/core';
import CustomAutocomplete from 'components/CustomAutocomplete';
import React, { useMemo, useState } from 'react';
import { AutocompleteOption } from 'types/inputField';

interface IFoodTypeProps {
	inputProps: Omit<StandardTextFieldProps, 'value' | 'onChange'>;
	fieldValue: number;
	setFieldValue: (fieldName: string, value: string) => void;
}
const FOOD_TYPE_LIST = [
	'Chinese',
	'Curry',
	'Arabic',
	'African',
	'Turkish',
	'Greek',
	'Kebab',
	'Moroccan',
	'Pizza',
	'Japanese',
];

const FoodType: React.FunctionComponent<IFoodTypeProps> = props => {
	const { inputProps, fieldValue, setFieldValue } = props;
	const [foodTypeSelected, setFoodTypeSelected] = useState<AutocompleteOption>(null);

	const foodTypeOptions: AutocompleteOption[] = useMemo(() => {
		//Initial option
		const options: AutocompleteOption[] = FOOD_TYPE_LIST.map(i => ({
			label: i,
			value: i,
		}));

		return options;
	}, [foodTypeSelected]);
	return (
		<CustomAutocomplete
			options={foodTypeOptions}
			optionSelected={foodTypeSelected}
			setOptionSelected={setFoodTypeSelected}
			AutocompleteProps={{
				renderOption: (props, option) => <li {...props}>{option.label}</li>,
				isOptionEqualToValue: (option, value) => option.value === value.value,
				renderInput: params => <TextField {...params} fullWidth variant="outlined" {...inputProps} type={'string'} />,
			}}
			renderInputProps={{ ...inputProps, name: inputProps.name, setFieldValue }}
			fieldValue={fieldValue}
		/>
	);
};

export default FoodType;
