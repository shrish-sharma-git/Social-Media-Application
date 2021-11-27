import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './pages/components/PrivateRoute';
import UserProfile from './pages/UserProfile';
import GuestProfile from './pages/GuestProfile';

function App() {
  return (
      <Router> 
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <Route path='/Signup' component={Signup} />
            <PrivateRoute path='/UserProfile' component={UserProfile} />
            <PrivateRoute path='/Settings' component={Settings} />
            <Route path='/ForgotPassword' component={ForgotPassword} />
            <Route path='/GuestProfile' component={GuestProfile} />
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
