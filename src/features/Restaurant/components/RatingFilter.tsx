import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@material-ui/core';
import TagIcon from 'assets/icons/TagIcon';
import { el } from 'date-fns/locale';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

export default function RatingFilter(props: {
	ratingSelected: object | null;
	onChangeRatingSelected: Dispatch<SetStateAction<object | null>>;
}) {
	const { ratingSelected, onChangeRatingSelected } = props;
	const [rating, setRating] = useState<null | number>(null);
	const [operator, setOperator] = useState<null | string>(null);

	const operation = ['lesser', 'equal', 'greater'];
	const ratings = [1, 2, 3, 4, 5, 6];

	const handleRatingSelectOptions = options => {
		if (options) {
			setRating(options);
			if (operator) {
				onChangeRatingSelected({
					rating: options,
					operator: operator,
				});
			}
		} else {
			setRating(null);
			if (operator && rating) {
				onChangeRatingSelected(null);
			}
		}
	};
	const handleOperationSelectOptions = options => {
		if (options) {
			setOperator(options);
			if (rating) {
				onChangeRatingSelected({
					rating: rating,
					operator: options,
				});
			}
		} else {
			setOperator(null);
			if (rating && operator) {
				onChangeRatingSelected(null);
			}
		}
	};

	return (
		<Stack direction="row" alignItems="center" justifyContent="left" spacing={3}>
			<Autocomplete
				// multiple
				value={operator}
				onChange={(_, value) => {
					handleOperationSelectOptions(value);
				}}
				id="tags-outlined"
				options={operation}
				fullWidth
				getOptionLabel={option => option}
				filterSelectedOptions
				renderInput={params => (
					<TextField {...params} label="operation" placeholder="select food type" size="small" fullWidth />
				)}
			/>
			<Autocomplete
				// multiple
				value={rating}
				onChange={(_, value) => {
					handleRatingSelectOptions(value);
				}}
				id="tags-outlined"
				options={ratings}
				fullWidth
				getOptionLabel={option => option.toString()}
				filterSelectedOptions
				renderInput={params => (
					<TextField {...params} label="Rating" placeholder="select food type" size="small" fullWidth />
				)}
			/>
		</Stack>
	);
}
