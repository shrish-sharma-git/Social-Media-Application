import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
      <Router>
          <Switch>
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
          </Switch>
      </Router>
  );
}

export default App;
