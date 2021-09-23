import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
            <Route path='/Profile' component={Profile} />
            <Route path='/Settings' component={Settings} />
          </Switch>
      </Router>
  );
}

export default App;
