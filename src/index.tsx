import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import i18n from 'i18n';
import 'nprogress/nprogress.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-quill/dist/quill.snow.css';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

ReactDOM.render(
	<StrictMode>
		<HelmetProvider>
			<I18nextProvider i18n={i18n}>
				<ReduxProvider store={store}>
					<StyledEngineProvider injectFirst>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</LocalizationProvider>
					</StyledEngineProvider>
				</ReduxProvider>
			</I18nextProvider>
		</HelmetProvider>
	</StrictMode>,
	document.getElementById('root')
);
