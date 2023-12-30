import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	IconButton,
	LinearProgress,
	Stack,
	TextField,
	Typography,
} from '@material-ui/core';
import XIcon from 'assets/icons/X';
import ConfirmModal from 'components/ConfirmModal';
import { Form, Formik } from 'formik';
import useMounted from 'hooks/useMounted';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'store';
import * as Yup from 'yup';

import { Restaurant } from 'types/restaurant';
import { createRestaurant, updateRestaurant } from 'slices/restaurant';
import FoodTypeField from './RestaurantFormFields/FoodTypeField';
import RatingField from './RestaurantFormFields/RatingField';

interface RestaurantFormProps {
	restaurant: Restaurant;
	onClose: () => void;
}

export const MIN_RATING = 1;
export const MAX_RATING = 6;

/* Validate */
const validate = Yup.object().shape({
	name: Yup.string().min(3).max(255).required(),
	address: Yup.string().min(3).max(255).required(),
	url: Yup.string().url().required(),
	addressLine2: Yup.string().nullable(),
	postcode: Yup.string().min(3).max(255).required(),
	rating: Yup.number().min(MIN_RATING).max(MAX_RATING),
});

const RestaurantForm: FC<RestaurantFormProps> = props => {
	const { restaurant: initRestaurant, onClose, ...other } = props;

	const [restaurant, setRestaurant] = useState<Restaurant>(initRestaurant);

	const mounted = useMounted();
	const dispatch = useDispatch();

	const refForm = useRef(null);

	const [openConfirm, setOpenConfirm] = useState(false);

	/* Initial Values */
	const initialValues = useMemo(() => {
		return {
			name: restaurant?.name || '',
			url: restaurant?.url || '',
			address: restaurant?.address || '',
			addressLine2: restaurant?.addressLine2,
			outcode: restaurant?.outcode,
			postcode: restaurant?.postcode || '',
			rating: restaurant?.rating || 5,
			foodType: restaurant?.foodType || '',
			options: [''],
		};
	}, [restaurant]);

	/**
	 * Handle Submit Form
	 * @param values
	 * @param param
	 */
	const handleSubmitForm = async (values, { resetForm, setErrors, setStatus, setSubmitting }): Promise<void> => {
		try {
			let restaurantValue: Restaurant = {
				name: values.name,
				url: values.url,
				address: values.address,
				addressLine2: values.addressLine2,
				outcode: values.outcode,
				postcode: values.postcode,
				rating: values.rating,
				foodType: values.foodType,
			};

			if (restaurantValue.foodType.length === 0) {
				toast.error('Please select a food type');
			}
			if (!restaurantValue.rating) {
				toast.error('Please provide a restaurant rating');
			}

			if (restaurantValue.foodType && restaurantValue.rating) {
				if (!restaurant) {
					await dispatch(createRestaurant(restaurantValue));
				} else {
					await dispatch(updateRestaurant(restaurant.id, restaurantValue));
				}

				if (mounted.current) {
					toast.success('Success');
					setStatus({ success: true });
					setSubmitting(false);
					if (restaurant) onClose();
				}
			}
		} catch (error) {
			if (error.statusCode === 403) {
				toast.error('You do not have permission to perform this action ');
				setStatus({ success: false });
				setErrors({ submit: error.message });
				setSubmitting(false);
				onClose();
			} else {
				console.dir(error);
				toast.error(`Error: ${error.message}`);
				setStatus({ success: false });
				setErrors({ submit: error.message });
				setSubmitting(false);
			}
		}
	};

	const handleClose = () => {
		if (refForm.current.dirty) {
			setOpenConfirm(true);
		} else {
			onClose();
		}
	};

	useEffect(() => {
		if (refForm.current.dirty) {
			window.onbeforeunload = () => {
				return 'Changes you made may not be saved.';
			};
		}

		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	return (
		<>
			<Card {...other} sx={{ overflowY: 'auto' }}>
				<CardHeader
					title={"Restaurant's Information"}
					action={
						<IconButton onClick={handleClose}>
							<XIcon fontSize="small" />
						</IconButton>
					}
				/>
				<Divider />
				<CardContent>
					<Formik
						innerRef={refForm}
						enableReinitialize
						initialValues={initialValues}
						validationSchema={validate}
						onSubmit={handleSubmitForm}
					>
						{({
							errors,
							handleBlur,
							handleChange,
							handleSubmit,
							isSubmitting,
							setFieldValue,
							touched,
							values,
						}): JSX.Element => {
							return (
								<Form>
									<Grid container spacing={3} justifyItems="flex-start" alignItems="flex-start">
										<Grid item xs={12}>
											<Grid
												container
												sx={{
													borderRadius: '10px',
													p: 2,
													boxShadow: '0px 1px 2px rgb(0 0 0 / 12%), 0px 0px 0px 1px rgb(0 0 0 / 5%)',
												}}
											>
												<Stack sx={{ width: '100%' }}>
													<Box sx={{ width: '100%' }}>
														<TextField
															value={values.name}
															error={Boolean(touched.name && errors.name)}
															helperText={touched.name && errors.name}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's name"
															name="name"
															variant="outlined"
														/>
													</Box>

													<Box sx={{ width: '100%', mt: 3 }}>
														<TextField
															value={values.address}
															error={Boolean(touched.address && errors.address)}
															helperText={touched.address && errors.address}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's address"
															name="address"
															variant="outlined"
														/>
													</Box>
													<Box sx={{ width: '100%', mt: 3 }}>
														<TextField
															value={values.addressLine2}
															error={Boolean(touched.addressLine2 && errors.addressLine2)}
															helperText={touched.addressLine2 && errors.addressLine2}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's address 2"
															name="addressLine2"
															variant="outlined"
														/>
													</Box>
													<Box sx={{ width: '100%', mt: 3 }}>
														<TextField
															value={values.url}
															error={Boolean(touched.url && errors.url)}
															helperText={touched.url && errors.url}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's url"
															name="url"
															variant="outlined"
														/>
													</Box>
												</Stack>
												<Stack direction="row" alignItems="center" spacing={5} sx={{ mt: 3 }}>
													<Box sx={{ flex: 1 }}>
														<TextField
															value={values.postcode}
															error={Boolean(touched.postcode && errors.postcode)}
															helperText={touched.postcode && errors.postcode}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's postcode"
															name="postcode"
															variant="outlined"
														/>
													</Box>
													<Box sx={{ flex: 1 }}>
														<TextField
															value={values.outcode}
															error={Boolean(touched.outcode && errors.outcode)}
															helperText={touched.outcode && errors.outcode}
															onBlur={handleBlur}
															onChange={handleChange}
															fullWidth
															size="small"
															label="Restaurant's out code"
															name="outcode"
															variant="outlined"
														/>
													</Box>
												</Stack>
											</Grid>
										</Grid>
										<Grid
											item
											xs={12}
											sx={{
												mt: 4,
											}}
										>
											<Stack
												sx={{
													p: 2,
													borderRadius: '10px',
													boxShadow: '0px 1px 2px rgb(0 0 0 / 12%), 0px 0px 0px 1px rgb(0 0 0 / 5%)',
												}}
											>
												<Typography color="textPrimary" variant="h6" textAlign="left" fontWeight="600" sx={{ mb: 1 }}>
													Restaurant Attribute Others
												</Typography>
												<Stack direction="row" alignItems="center" spacing={5} sx={{ mt: 1 }}>
													<Box sx={{ flex: 1 }}>
														<FoodTypeField
															inputProps={{
																error: Boolean(touched.foodType && errors.foodType),
																helperText: touched.foodType && errors.foodType,
																onBlur: handleBlur,
																fullWidth: true,
																size: 'small',
																label: 'Food Type',
																name: 'foodType',
																type: 'string',
															}}
															fieldValue={values.foodType}
															setFieldValue={setFieldValue}
														/>
													</Box>
													<Box sx={{ flex: 1 }}>
														<RatingField
															inputProps={{
																error: Boolean(touched.rating && errors.rating),
																helperText: touched.rating && errors.rating,
																onBlur: handleBlur,
																fullWidth: true,
																size: 'small',
																label: 'Rating',
																name: 'rating',
																type: 'number',
															}}
															fieldValue={values.rating}
															setFieldValue={setFieldValue}
														/>
													</Box>
												</Stack>
											</Stack>
										</Grid>
									</Grid>
									<Box sx={{ mt: 4 }} textAlign="right">
										<Box sx={{ my: 2, px: 1, pb: 2 }} display={isSubmitting ? '' : 'none'}>
											<LinearProgress />
										</Box>
										<Button type="button" color="secondary" variant="contained" onClick={handleClose} sx={{ mr: 2 }}>
											Cancel
										</Button>
										<Button color="primary" variant="contained" type="submit" disabled={isSubmitting} sx={{ mr: 2 }}>
											Save
										</Button>
									</Box>
								</Form>
							);
						}}
					</Formik>
				</CardContent>
			</Card>
			<ConfirmModal
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				onConfirm={onClose}
				title="Warning"
				content="This content is not saved. Do you want to close this form?"
			/>
		</>
	);
};

export default RestaurantForm;
