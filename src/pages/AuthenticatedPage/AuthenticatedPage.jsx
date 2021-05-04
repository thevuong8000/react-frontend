import { Box, Flex } from '@chakra-ui/layout';
import Header from '@common/Header/Header';
import { ROUTE } from '@constants/routing';
import { PAGE_TITLE } from '@constants/text';
import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Homepage = lazy(() => import('../Homepage/Homepage'));

const AuthenticatedPage = () => (
  <Router>
    <Flex direction="column" overflow="hidden" h="100%">
      <Header />
      <Box>
        <Switch>
          <Route
            exact
            path={ROUTE.HOME.to}
            render={() => <Homepage documentTitle={PAGE_TITLE.HOMEPAGE} />}
          />

          {/* Default fall back to Homepage */}
          <Route path="*">
            <Redirect to={ROUTE.HOME.to} />
          </Route>
        </Switch>
      </Box>
    </Flex>
  </Router>
);

export default AuthenticatedPage;
