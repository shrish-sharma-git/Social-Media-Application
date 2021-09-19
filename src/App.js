import React, { useMemo } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

function App() {
  return (
      <Router>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
          </Switch>
      </Router>
  );
}

export default App;
