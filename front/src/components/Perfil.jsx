import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LabelInput from './LabelInput';
import ImagenRegistro from '../assets/static/registro2.jpg';
import '../assets/styles/Registro.css';
import { petition } from '../functions';
import LoaderDualRing from './LoaderDualRing';

const buttonStyle = {
  background: '#0170bc',
  color: 'white',
};

const Perfil = ({ authorization, setAuthorization }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    petition('usuarios', 'GET', authorization.authorization, {})
      .then((response) => {
        const { cuerpo: usuario } = response;

        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setPais(usuario.pais);
        setCiudad(usuario.ciudad);
      });
  }, []);

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
    petition('usuarios', 'PUT', authorization.authorization, {
      obj_usuario: {
        nombre: document.querySelector('#namePerfil').value,
        apellido: document.querySelector('#lastNamePerfil').value,
        pais: document.querySelector('#countryPerfil').value,
        ciudad: document.querySelector('#cityPerfil').value,
      },
    })
      .then((response) => {
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
          Swal.fire(
            'Error al editar perfil',
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
              history.push('/perfil');
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
                  <p style={{ fontSize: 40 }}>Editar Perfil</p>
                </div>
              </div>
              <div className='pt-2'>
                <div className='form-group'>
                  <LabelInput name='namePerfil' placeholder='Nombre' value={nombre} onChange={(e) => { setNombre(e.target.value); }} required>Nombre</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='lastNamePerfil' placeholder='Apellido' value={apellido} onChange={(e) => { setApellido(e.target.value); }} required>Apellido</LabelInput>
                </div>
                <div className='form-group'>
                  <LabelInput name='countryPerfil' maxlength={2} placeholder='País' value={pais} onChange={(e) => { setPais(e.target.value); }} required>País</LabelInput>
                </div>
                <div className='form-group pb-1'>
                  <LabelInput name='cityPerfil' placeholder='Ciudad' value={ciudad} onChange={(e) => { setCiudad(e.target.value); }} required>Ciudad</LabelInput>
                </div>
                <div className='form-group pb-1'>
                  <LabelInput name='passwordPerfil' placeholder='Nueva Clave' type='password' required={false}>Nueva Clave</LabelInput>
                </div>
                <div className='form-group pb-1'>
                  <LabelInput name='passwordRepeatPerfil' placeholder='Repetir Nueva Clave' type='password' required={false}>Repetir Nueva Clave</LabelInput>
                </div>
                <div className='row'>
                  <div className='col-lg-6 py-4'>
                    <button type='submit' className='btn bg-button w-100'>Editar Perfil</button>
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

export default Perfil;

