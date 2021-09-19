import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
          </Switch>
      </Router>
  );
}

export default App;
