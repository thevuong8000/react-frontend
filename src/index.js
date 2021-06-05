import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { CHAKRA_CUSTOM_THEME } from '@constants/configs';
import AppProviders from './contexts/app-providers.jsx';
import App from './App';

require('./index.scss');

ReactDOM.render(
	<>
		<ColorModeScript initialColorMode="light" />
		<ChakraProvider theme={CHAKRA_CUSTOM_THEME} resetCSS>
			<AppProviders>
				<App />
			</AppProviders>
		</ChakraProvider>
	</>,
	document.getElementById('root')
);
