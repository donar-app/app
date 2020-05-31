import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Publicaciones from '../pages/Publicaciones';
import ScrollToTop from '../components/ScrollToTop';
import Publicar from '../pages/Publicar';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Registro from '../components/Registro';
import SobreNosotros from '../pages/SobreNosotros';
import Donar from '../pages/Donar';
import Solicitar from '../pages/Solicitar';
import ViewProducto from '../pages/ViewProducto';

const App = () => {
  const [authorization, setAuthorization] = useState(null);

  return (
    <div className='tw-min-h-screen tw-flex tw-flex-col '>
      <HashRouter>
        <NavBar authorization={authorization} />
        <div className='tw-container mx-auto tw-flex-grow tw-flex tw-flex-col'>
          <Switch>
            <Route exact path='/'>
              <ScrollToTop />
              <Home authorization={authorization} />
            </Route>
            <Route path='/publicar'>
              <Switch>
                <Route exact path='/publicar'>
                  <ScrollToTop />
                  <Publicar authorization={authorization} />
                </Route>
                <Route path='/publicar/donar'>
                  <ScrollToTop />
                  <Donar authorization={authorization} setAuthorization={setAuthorization} />
                </Route>
                <Route path='/publicar/solicitar'>
                  <ScrollToTop />
                  <Solicitar authorization={authorization} setAuthorization={setAuthorization} />
                </Route>
              </Switch>
            </Route>
            <Route path='/producto/:id'>
              <ScrollToTop />
              <ViewProducto authorization={authorization} setAuthorization={setAuthorization} />
            </Route>
            <Route path='/donaciones'>
              <ScrollToTop />
              <Publicaciones />
            </Route>
            <Route path='/iniciarSesion'>
              <ScrollToTop />
              <Login setAuthorization={setAuthorization} />
            </Route>
            <Route path='/Registrarse'>
              <ScrollToTop />
              <Registro />
            </Route>
            <Route path='/sobreNosotros'>
              <ScrollToTop />
              <SobreNosotros />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
