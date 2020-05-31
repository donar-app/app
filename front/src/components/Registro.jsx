import React from 'react';
import LabelInput from './LabelInput';
import ImagenRegistro from '../assets/static/registro2.jpg';
import '../assets/styles/Login.css';
import { petition } from '../functions';

const Registro = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    petition('registro', 'POST', null, {
      alias: document.querySelector('#userRegister').value,
      nombre: document.querySelector('#nameRegister').value,
      apellido: document.querySelector('#lastNameRegister').value,
      email: document.querySelector('#emailRegister').value,
      pais: document.querySelector('#countryRegister').value,
      ciudad: document.querySelector('#cityRegister').value,
    });
  };

  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-md-6 d-none d-sm-none d-md-block'>
          <img src={ImagenRegistro} className='card-img' alt='Imagen Login' />
        </div>
        <div className='col-md-6 d-flex align-items-center'>
          <div className='card-body mx-5'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='row'>
                <div className='col-12 text-center'>
                  <p style={{ fontSize: 40 }}>Registrate</p>
                </div>
              </div>
              <div className='pt-2'>
                <div className='form-group'>
                  <LabelInput name='nameRegister' placeholder='Nombre'>Nombre</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='lastNameRegister' placeholder='Apellido'>Apellido</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='emailRegister' type='email' placeholder='example@example.com'>Email</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='userRegister' placeholder='Alias'>Alias</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='countryRegister' placeholder='País'>País</LabelInput>
                </div>
                <div className='form-group pb-1'>
                  <LabelInput name='cityRegister' placeholder='Ciudad'>Ciudad</LabelInput>
                </div>
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

