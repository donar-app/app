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
    <div className='tw-min-h-screen tw-flex tw-flex-col'>
      <HashRouter>
        <NavBar />
        <div className='tw-container mx-auto tw-flex-grow tw-flex tw-flex-col'>
          <Switch>
            <Route exact path='/'>
              <ScrollToTop />
              <Home />
            </Route>
            <Route path='/publicar'>
              <ScrollToTop />
              <Publicar />
            </Route>
            <Route path='/donaciones'>
              <ScrollToTop />
              <Publicaciones />
            </Route>
            <Route path='/iniciarSesion'>
              <ScrollToTop />
              <Login />
            </Route>
            <Route path='/Registrarse'>
              <ScrollToTop />
              <Registro />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
