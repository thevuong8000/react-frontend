import React from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  withDefaultColorScheme,
  withDefaultSize
} from '@chakra-ui/react';
import AppProviders from './contexts/app-providers.jsx';
import App from './App';

require('./index.scss');

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};
const theme = extendTheme(
  { config },

  // Color Scheme
  withDefaultColorScheme({
    colorScheme: 'blue',
    components: ['Button']
  }),
  withDefaultColorScheme({
    colorScheme: 'green',
    components: ['Checkbox']
  }),

  // Size
  withDefaultSize({
    size: 'xs',
    components: ['Button']
  }),
  withDefaultSize({
    size: 'sm',
    components: ['RadioGroup']
  })

  // Variant
);

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
