import { Autocomplete, InputAdornment, TextField } from '@material-ui/core';
import TagIcon from 'assets/icons/TagIcon';
import { Dispatch, SetStateAction, useMemo } from 'react';

export default function FoodTypeFilter(props: {
	foodTypeSelected: string;
	onChangeFoodTypeSelected: Dispatch<SetStateAction<''>>;
}) {
	const { foodTypeSelected, onChangeFoodTypeSelected } = props;

	const tags = ['Chinese', 'Curry', 'Arabic', 'African', 'Turkish', 'Greek', 'Kebab', 'Moroccan', 'Pizza', 'Japanese'];

	const handleSelectOptions = options => {
		if (options) {
			onChangeFoodTypeSelected(options);
		} else {
			onChangeFoodTypeSelected(null);
		}
	};

	return (
		<Autocomplete
			// multiple
			value={foodTypeSelected}
			onChange={(_, value) => {
				handleSelectOptions(value);
			}}
			id="tags-outlined"
			options={tags}
			fullWidth
			getOptionLabel={option => option}
			filterSelectedOptions
			renderInput={params => (
				<TextField {...params} label="Filter by food type" placeholder="select food type" size="small" fullWidth />
			)}
		/>
	);
}
