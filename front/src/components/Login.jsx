import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoaderDualRing from './LoaderDualRing';
import LabelInput from './LabelInput';
import ImagenLogin from '../assets/static/ropa-donacion.jpg';
import '../assets/styles/Login.css';
import { petition } from '../functions';

const Login = ({ setAuthorization }) => {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando datos...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('ingreso', 'POST', `Basic ${btoa(`${document.querySelector('#userLogin').value}:${document.querySelector('#passLogin').value}`)}`)
      .then((response) => {
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
          Swal.fire(
            'Error al Loguearse',
            mensaje,
            'error',
          );
        } else {
          localStorage.setItem('authorization', response.authorization);
          setAuthorization({
            ...response.cuerpo,
            authorization: response.authorization,
          });
          Swal.fire({
            icon: 'success',
            title: 'Logueado con Exito!',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          })
            .then(() => {
              history.push('/');
            });
        }
      });
  };

  return (
    <div className='animate__animated animate__fadeIn tw-flex-grow tw-flex tw-justify-center tw-items-center'>
      <div className='card mb-3'>
        <div className='row no-gutters'>
          <div className='col-md-6 d-none d-sm-none d-md-block'>
            <img src={ImagenLogin} className='card-img h-100' alt='Imagen Login' />
          </div>
          <div className='col-md-6'>
            <div className='card-body mx-5'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='row'>
                  <div className='col-12 text-center'>
                    <p style={{ fontSize: 40 }}>Ingresa</p>
                  </div>
                </div>
                <div className='pt-2'>
                  <div className='form-group'>
                    <LabelInput name='userLogin'>Usuario</LabelInput>
                  </div>
                  <div className='form-group'>
                    <LabelInput name='passLogin' className='alert' type='password'>Contraseña</LabelInput>
                  </div>
                  <div className='row pb-3'>
                    {/*<div className='col-6 d-flex align-items-center'>
                      <input type='checkbox' id='recordame' />
                      <label className='m-0 ml-2 tw-text-sm' htmlFor='recordame'>Recuerdame</label>
  </div>*/}
                    <div className='col-12 d-flex justify-content-end'>
                      <p className='tw-text-sm'>
                        ¿No tienes cuenta?
                        {' '}
                        <Link to='/Registrarse'>Registrate</Link>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-lg-6 py-4'>
                      <button type='submit' className='btn bg-button w-100'>Ingresar</button>
                    </div>
                    {/*<div className='col-lg-6 py-lg-4'>
                      <button type='button' className='btn-google btn w-100'>
                        <i className='fab fa-google-plus-g' />
                        <span className='pl-2'>Ingresar con Google</span>
                      </button>
                    </div>*/}
                  </div>
                </div>
              </form>
            </div>
            {/*<div className='card-footer text-center'>
              <p className='tw-text-sm'><a href=''>¿Olvidó la contraseña?</a></p>
                  </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

