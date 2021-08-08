import React, { FC, lazy } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Header } from '@common';
import { ROUTE } from '@constants/routing';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// const Homepage = lazy(() => import('../Homepage/Homepage'));
// const DemoComponents = lazy(() => import('../../demo-components/DemoComponents'));
const Candra = lazy(() => import('../Candra/Candra'));

const AuthenticatedPage: FC = () => (
  <Router>
    <Flex direction="column" overflow="hidden" h="100vh">
      <Header />
      <Box overflowX="hidden" overflowY="auto" w="100%" h="100%">
        <Switch>
          {/* <Route
            exact
            path={ROUTE.HOME.to}
            render={() => <Homepage documentTitle={ROUTE.HOME.title} />}
          /> */}

          {/* <Route
            exact
            path={ROUTE.DEMO.to}
            render={() => <DemoComponents documentTitle={ROUTE.DEMO.title} />}
          /> */}

          <Route
            exact
            path={ROUTE.CANDRA.to}
            render={() => <Candra documentTitle={ROUTE.CANDRA.title} />}
          />

          {/* Default fall back to Homepage */}
          <Route path="*">
            <Redirect to={ROUTE.CANDRA.to} />
          </Route>
        </Switch>
      </Box>
    </Flex>
  </Router>
);

export default AuthenticatedPage;
