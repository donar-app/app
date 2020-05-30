import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Donar from '../components/Donar';
import Solicitar from '../components/Solicitar';

const Publicar = () => {
  return (
    <main className='pt-2 animate__animated animate__fadeIn'>
      <div className='tw-grid tw-grid-cols-2 tw-divide-x-2 tw-border-t-2 tw-border-b-2 tw-text-center'>
        <div>
          <Link to='/publicar/donar' className='tw-text-center text-orange-donar tw-rounded-full tw-text-lg'>donar</Link>
        </div>
        <div>
          <Link to='/publicar/solicitar' className='text-yellow-donar tw-rounded-full tw-text-lg'>solicitar</Link>
        </div>
      </div>
      <div className='py-4 px-4'>
        <Switch>
          <Route to='/publicar/donar'>
            <Donar />
          </Route>
          <Route to='/publicar/solicitar'>
            <Solicitar />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default Publicar;
