import { Box, Flex } from '@chakra-ui/layout';
import Header from '@common/Header/Header';
import { ROUTE } from '@constants/routing';
import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Homepage = lazy(() => import('../Homepage/Homepage'));
const DemoComponents = lazy(() => import('@common/DemoComponents'));

const AuthenticatedPage = () => (
  <Router>
    <Flex direction="column" overflow="hidden" h="100%">
      <Header />
      <Box>
        <Switch>
          <Route
            exact
            path={ROUTE.HOME.to}
            render={() => <Homepage documentTitle={ROUTE.HOME.title} />}
          />

          <Route
            exact
            path={ROUTE.DEMO.to}
            render={() => <DemoComponents documentTitle={ROUTE.DEMO.title} />}
          />

          {/* Default fall back to Homepage */}
          <Route path="*">
            <Redirect to={ROUTE.DEMO.to} />
          </Route>
        </Switch>
      </Box>
    </Flex>
  </Router>
);

export default AuthenticatedPage;
