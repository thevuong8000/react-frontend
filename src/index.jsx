import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import AppProviders from './contexts/app-providers.jsx';
import App from './App';

require('./index.scss');

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};
const theme = extendTheme(
  { config },
  {
    components: {
      Button: {
        defaultProps: {
          colorScheme: 'blue',
          size: 'xs'
        }
      },
      Checkbox: {
        defaultProps: {
          colorScheme: 'green'
        }
      },
      Radio: {
        defaultProps: {
          size: 'sm'
        }
      },
      Input: {
        defaultProps: {
          size: 'sm'
        }
      }
    }
  }
);

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={config.initialColorMode} />
    <ChakraProvider theme={theme} resetCSS>
      <AppProviders>
        <App />
      </AppProviders>
    </ChakraProvider>
  </>,
  document.getElementById('root')
);
