import React from 'react';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminIndex from './pages/AdminIndex';

const App = () => (
  <>
    <Route path="/login" component={Login} />
    <Route path="/index" component={AdminIndex} />
  </>
);

export default App;
