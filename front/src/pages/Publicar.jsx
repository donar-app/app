import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Donar from '../components/Donar';
import Solicitar from '../components/Solicitar';

const Publicar = () => {
  const history = useHistory();

  const goTo = (path) => {
    history.push(`/publicar/${path}`);
  };

  return (
    <main className='animate__animated animate__fadeIn'>
      <Switch>
        <Route exact path='/publicar'>
          <div className='tw-text-center'>
            <h2 className='tw-text-2xl tw-font-bold tw-text-gray-700 tw-pt-8'>¿Que desea hacer?</h2>
            <div className='tw-pt-10 tw-space-y-6 tw-text-white tw-px-10'>
              <div>
                <button type='button' onClick={() => goTo('donar')} className='tw-text-lg tw-font-bold bg-orange-donar tw-py-2 tw-max-w-xs tw-w-full tw-rounded'>¡Me gustaría donar!</button>
              </div>
              <div>
                <button type='button' onClick={() => goTo('solicitar')} className='tw-text-lg tw-font-bold bg-blue-donar tw-py-2 tw-max-w-xs tw-w-full tw-rounded'>¡Quiero Solicitar!</button>
              </div>
            </div>
          </div>
        </Route>
        <Route path='/publicar/donar'>
          <Donar />
        </Route>
        <Route path='/publicar/solicitar'>
          <Solicitar />
        </Route>
      </Switch>
    </main>
  );
};

export default Publicar;
