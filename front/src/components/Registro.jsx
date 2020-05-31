import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LabelInput from './LabelInput';
import ImagenRegistro from '../assets/static/registro2.jpg';
import '../assets/styles/Registro.css';
import { petition } from '../functions';
import LoaderDualRing from './LoaderDualRing';

const Registro = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    console.log('hola');
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando datos...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('registro', 'POST', null, {
      alias: document.querySelector('#userRegister').value,
      nombre: document.querySelector('#nameRegister').value,
      apellido: document.querySelector('#lastNameRegister').value,
      email: document.querySelector('#emailRegister').value,
      pais: document.querySelector('#countryRegister').value,
      ciudad: document.querySelector('#cityRegister').value,
    })
      .then((response) => {
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
          Swal.fire(
            'Error al registrarse',
            mensaje,
            'error',
          );
        } else {
          Swal.fire({
            icon: 'success',
            title: response.mensaje,
            confirmButtonText: '¡Continuar!',
            confirmButtonColor: '#dd7f0e',
            allowOutsideClick: false,
          })
            .then(() => {
              history.push('/');
            });
        }
      });
  };

  return (
    <div className='card mb-3 '>
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
                    <button type='submit' className='btn bg-button w-100'>Registrate</button>
                  </div>
                  {/*<div className='col-lg-6 py-lg-4'>
                    <button type='button' className='btn-google btn w-100'>
                      <i className='fab fa-google-plus-g' />
                      <span className='pl-2'>Registrate con Google</span>
                    </button>
                  </div>*/}
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

