import React from 'react';
import Routes from './router';
import GlobalStyles from './styles/global';

import { Router } from 'react-router-dom';
import history from './services/history';

function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
    </Router>
  );
}

export default App;
