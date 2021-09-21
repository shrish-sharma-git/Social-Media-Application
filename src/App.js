import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
          </Switch>
      </Router>
  );
}

export default App;
