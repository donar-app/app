import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';

const App = () => {
  return (
    <HashRouter>
      <div className='tw-container mx-auto'>
        <Switch>
          <Route to='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
