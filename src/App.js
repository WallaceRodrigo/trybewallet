import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (p) => <Login { ...p } /> } />
      <Route exact path="/carteira" component={ wallet } />
    </Switch>
  );
}

export default App;
