import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Publicaciones from '../pages/Publicaciones';
import ScrollToTop from '../components/ScrollToTop';
import Publicar from '../pages/Publicar';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Registro from '../components/Registro';

const App = () => {
  return (
    <div className='min-h-screen'>
      <HashRouter>
        <NavBar />
        <div className='tw-container mx-auto'>
          {/* <Switch>
            <Route exact path='/'>
              <ScrollToTop />
              <Home />
            </Route>
            <Route path='/publicar'>
              <ScrollToTop />
              <Publicar />
            </Route>
            <Route path='/publicaciones'>
              <ScrollToTop />
              <Publicaciones />
            </Route>
          </Switch> */}
          <Registro/>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
