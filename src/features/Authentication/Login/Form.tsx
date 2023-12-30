import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	LinearProgress,
	OutlinedInput,
	TextField,
} from '@material-ui/core';

import Eye from 'assets/icons/Eye';
import EyeOff from 'assets/icons/EyeOff';
import { login } from 'features/Authentication/slice';
import { Formik } from 'formik';
import useMounted from 'hooks/useMounted';
import { FC, useState } from 'react';
import { useDispatch } from 'store';
import * as Yup from 'yup';

const validate = Yup.object().shape({
	username: Yup.string().max(255).required('Username is required'),
	password: Yup.string().max(255).required('Password is required'),
});

const initialValues = {
	username: '',
	password: '',
	submit: null,
};

const FormLogin: FC = props => {
	const mounted = useMounted();
	const dispatch = useDispatch();

	const onSubmitForm = async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
		try {
			await dispatch(login(values.username, values.password));
			if (mounted.current) {
				setStatus({ success: true });
				setSubmitting(false);
			}
		} catch (err) {
			console.error(err);
			if (mounted.current) {
				setStatus({ success: false });
				setErrors({ submit: err.message });
				setSubmitting(false);
			}
		}
	};

	// Handle visible password
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleToggleShowPassword = () => {
		setShowPassword(x => !x);
	};

	return (
		<Formik enableReinitialize initialValues={initialValues} validationSchema={validate} onSubmit={onSubmitForm}>
			{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
				<form noValidate onSubmit={handleSubmit} {...props}>
					<TextField
						autoFocus
						error={Boolean(touched.username && errors.username)}
						fullWidth
						helperText={touched.username && errors.username}
						label="Username"
						margin="normal"
						name="username"
						onBlur={handleBlur}
						onChange={handleChange}
						type="username"
						value={values.username}
						variant="outlined"
					/>

					<FormControl
						fullWidth
						error={Boolean(touched.password && errors.password)}
						margin="normal"
						variant="outlined"
					>
						<InputLabel htmlFor="password">Password</InputLabel>
						<OutlinedInput
							id="password"
							label="Password"
							name="password"
							value={values.password}
							type={showPassword ? 'text' : 'password'}
							onChange={handleChange}
							onBlur={handleBlur}
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={handleToggleShowPassword} edge="end">
										{showPassword ? <EyeOff /> : <Eye />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error={Boolean(touched.password && errors.password)} sx={{ m: '3px 14px 0' }} id="password">
							{touched.password && errors.password}
						</FormHelperText>
					</FormControl>

					{errors.submit && (
						<Box sx={{ mt: 1 }}>
							<FormHelperText error>{errors.submit}</FormHelperText>
						</Box>
					)}
					<Box sx={{ my: 2, mx: 3, pb: 1 }} display={isSubmitting ? '' : 'none'}>
						<LinearProgress />
					</Box>
					<Box sx={{ mt: 2 }}>
						<Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
							Log In
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default FormLogin;
