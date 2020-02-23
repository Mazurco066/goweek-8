import React from 'react';
import Routes from './router';
import GlobalStyles from './styles/global';
import { ToastContainer } from 'react-toastify';

import { Router } from 'react-router-dom';
import history from './services/history';

function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
