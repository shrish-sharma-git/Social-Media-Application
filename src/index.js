import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './context/firebase';
import { ThemeProvider } from '@material-ui/styles';

ReactDOM.render(
  // <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />,
  // </FirebaseContext.Provider>
  document.getElementById('root')
);
