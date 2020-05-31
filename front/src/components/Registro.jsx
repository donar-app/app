import React from 'react';
import LabelInput from './LabelInput.jsx';
import ImagenRegistro from '../assets/static/registro2.jpg';
import '../assets/styles/Login.css';

const Registro = () => {

  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-md-6 d-none d-sm-none d-md-block'>
          <img src={ImagenRegistro} className='card-img' alt='Imagen Login' />
        </div>
        <div className='col-md-6 d-flex align-items-center'>
          <div className='card-body mx-5'>
            <form action='#'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <p style={{ fontSize: 40 }}>Registrate</p>
                </div>
              </div>

              <div className='pt-2'>
                <div className='form-group'>
                  <LabelInput placeholder={'Nombre'}>Nombre</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput placeholder={'Apellido'}>Apellido</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput type={'email'} placeholder={'example@example.com'}>Email</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput placeholder={'Alias'}>Alias</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput placeholder={'País'}>País</LabelInput>
                </div>
                <div className='form-group pb-1'>
                  <LabelInput placeholder={'Ciudad'}>Ciudad</LabelInput>
                </div>

                <hr />

                <div className='row'>
                  <div className='col-lg-6 py-4'>
                    <button type='submit' className='btn btn-primary w-100'>Registrate</button>
                  </div>
                  <div className='col-lg-6 py-lg-4'>
                    <button type='button' className='btn-google btn w-100'>
                      <i className='fab fa-google-plus-g' />
                      <span className='pl-2'>Registrate con Google</span>
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Registro;

