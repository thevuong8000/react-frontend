import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import AppProviders from './contexts/app-providers.jsx';
import App from './App';

require('./index.scss');

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true
};
const theme = extendTheme({ config });

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AppProviders>
        <App />
      </AppProviders>
    </ChakraProvider>
  </>,
  document.getElementById('root')
);
