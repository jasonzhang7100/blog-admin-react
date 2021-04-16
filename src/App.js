import React from 'react';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminIndex from './pages/AdminIndex';

const App = () => (
  <>
    <Route path="/login" exact component={Login} />
    <Route path="/index" exact component={AdminIndex} />
  </>
);

export default App;
