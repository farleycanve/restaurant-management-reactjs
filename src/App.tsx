import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { authInit } from 'features/Authentication/slice';
import { restoreSettings, selectorSettings } from 'layout/slice';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { authSelector } from 'utils/selectors';
import { createCustomTheme } from './assets/theme';
import SplashScreen from './components/SplashScreen';
import { gtmConfig } from './config';
import useScrollReset from './hooks/useScrollReset';
import RTL from './layout/RTL';
import gtm from './lib/gtm';
import routes from './routes';
import './App.css';

const App: FC = () => {
	const content = useRoutes(routes);
	const settings = useSelector(selectorSettings);
	const auth = useSelector(authSelector);
	const dispatch = useDispatch();

	useScrollReset();

	useEffect(() => {
		gtm.initialize(gtmConfig);
		/* Setting Init */
		dispatch(restoreSettings());

		/* Check Authenticated */
		dispatch(authInit());
	}, []);

	const theme = createCustomTheme({
		direction: settings.direction,
		responsiveFontSizes: settings.responsiveFontSizes,
		roundedCorners: settings.roundedCorners,
		theme: settings.theme,
	});

	return (
		<ThemeProvider theme={theme}>
			<RTL direction={settings.direction}>
				<CssBaseline />
				<Toaster position="top-center" />
				{auth.isInitialized ? content : <SplashScreen />}
			</RTL>
		</ThemeProvider>
	);
};

export default App;
