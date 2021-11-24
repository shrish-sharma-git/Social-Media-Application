import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './pages/components/PrivateRoute';

function App() {
  return (
      <Router> 
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
            <PrivateRoute path='/Profile' component={Profile} />
            <PrivateRoute path='/Settings' component={Settings} />
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
