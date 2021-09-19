import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
      <Router>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
          </Switch>
      </Router>
  );
}

export default App;
