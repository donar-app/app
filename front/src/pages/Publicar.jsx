import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Donar from '../components/Donar';
import Solicitar from '../components/Solicitar';

const Publicar = () => {
  return (
    <main className='pt-2 animate__animated animate__fadeIn'>
      <div className='tw-grid tw-grid-cols-2 tw-divide-x-2 tw-border-t-2 tw-border-b-2 tw-text-center'>
        <div>
          <Link to='/publicar/donar' className='tw-text-center text-orange-donar tw-rounded-full tw-transform tw-duration-200 hover:tw-scale-105'>donar</Link>
        </div>
        <div>
          <Link to='/publicar/solicitar' className='text-yellow-donar tw-rounded-full tw-transform tw-duration-200 hover:tw-scale-105'>solicitar</Link>
        </div>
      </div>
      <Switch>
        <Route to='/publicar/donar'>
          <Donar />
        </Route>
        <Route to='/publicar/solicitar'>
          <Solicitar />
        </Route>
      </Switch>
    </main>
  );
};

export default Publicar;
