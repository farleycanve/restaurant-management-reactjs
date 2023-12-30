import {
	Autocomplete,
	AutocompleteProps,
	createFilterOptions,
	Stack,
	StandardTextFieldProps,
	TextField,
} from '@material-ui/core';
import React, { Dispatch, useEffect } from 'react';

import { SetStateAction } from 'react';
import { AutocompleteOption } from 'types/inputField';

interface InputProps extends StandardTextFieldProps {
	name: string;
	setFieldValue: (fieldName: string, value: string | number) => void;
}

interface ICustomAutocompleteProps {
	fieldValue?: string | number;
	options: AutocompleteOption[];
	optionSelected: AutocompleteOption;
	renderInputProps?: Omit<InputProps, 'value' | 'onChange'>;
	AutocompleteProps?: Partial<AutocompleteProps<any, boolean, boolean, boolean, React.ElementType<any>>>;
	setOptionSelected: Dispatch<SetStateAction<AutocompleteOption>>;
}

const filter = createFilterOptions<AutocompleteOption>();

const CustomAutocomplete: React.FunctionComponent<ICustomAutocompleteProps> = props => {
	const {
		fieldValue = '',
		options,
		optionSelected,
		setOptionSelected,
		renderInputProps: { setFieldValue, ...TextFieldProps },
		AutocompleteProps = {},
	} = props;

	const handleChangeOptionSelected = (option: AutocompleteOption) => {
		setOptionSelected(option);
		setFieldValue(TextFieldProps.name, option?.value || '');
	};

	useEffect(() => {
		const defaultOption = Boolean(fieldValue) ? { value: fieldValue, label: fieldValue.toString() } : null;
		handleChangeOptionSelected(defaultOption);
	}, [fieldValue]);

	const handleSelectOption = (newValue: AutocompleteOption | string) => {
		if (typeof newValue === 'string') {
			// timeout to avoid instant validation of the dialog's form.
			setTimeout(() => {
				// toggleOpen(true);
				handleChangeOptionSelected({ value: newValue, label: newValue.toString() });
			});
		} else if (newValue && newValue.inputValue) {
			// toggleOpen(true);
			handleChangeOptionSelected({ value: newValue.inputValue, label: newValue.inputValue.toString() });
		} else {
			handleChangeOptionSelected(newValue);
		}
	};

	return (
		<>
			<Stack>
				<Autocomplete
					value={optionSelected}
					options={options}
					disableClearable
					getOptionLabel={option => {
						// e.g value selected with enter, right from the input
						if (typeof option === 'string') {
							return option;
						}
						if (option.inputValue) {
							return option.inputValue;
						}
						return option.label;
					}}
					onChange={(_, value) => {
						handleSelectOption(value);
					}}
					renderInput={params => <TextField {...params} fullWidth variant="outlined" {...TextFieldProps} type="text" />}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);

						if (params.inputValue !== '') {
							filtered.push({
								value: params.inputValue,
								inputValue: params.inputValue,
								label: `Add "${params.inputValue}"`,
							});
						}

						return filtered;
					}}
					renderOption={(props, option) => <li {...props}>{option.label}</li>}
					sx={{ minWidth: '100px' }}
					{...AutocompleteProps}
				/>
			</Stack>
			{/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new option</DialogTitle>
                <DialogContent>
                    <DialogContentText>Did you miss any time option in our list? Please, add it!</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue}
                        onChange={(event) => {
                            const inputValue = event.target.value;
                            setDialogValue(inputValue);
                        }}
                        label="Time"
                        type={TextFieldProps.type || 'text'}
                        variant="standard"
                    />
                    {Boolean(dialogValueError) && (
                            <Box sx={{ width: '100%' }}>
                                <FormHelperText error>{dialogValueError}</FormHelperText>
                            </Box>
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog> */}
		</>
	);
};

export default CustomAutocomplete;
