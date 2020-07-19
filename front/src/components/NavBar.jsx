import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';
import LogoCompeto from '../assets/static/logo-completo.png';
import Avatar from '../assets/static/user.png';

const NavBar = ({ authorization }) => {

  function handleMenuOpen() {
    const menuNav = document.querySelector('.menu_nav');
    menuNav.classList.toggle('menu_open');

    if (menuNav.classList.contains('menu_open')) {
      document.querySelector('body').classList.add('overflow-hiden');
    } else {
      document.querySelector('body').classList.remove('overflow-hiden');
    }
  }

  function closeMenu() {
    const menuNav = document.querySelector('.menu_nav');

    if (menuNav.classList.contains('menu_open')) {
      handleMenuOpen();
      menuNav.classList.remove('menu_open');
    }
  }

  return (
    <nav className='navbar shadow tw-sticky tw-top-0 tw-left-0 tw-z-10'>
      <div className='container'>
        <button type='button' className='d-block d-sm-block d-md-none button-desplegable' aria-label='Menu' onClick={handleMenuOpen}><i className='fas fa-bars fa-sm' /></button>
        <div className='d-none d-sm-none d-md-block'>
          <div className='links tw-flex tw-flex-row-reverse tw-space-x-4 tw-space-x-reverse'>

            {
              authorization && false && (
                <Link to='/salir'>
                  <i className='text-secondary fas fa-times-circle' />
                  <span className='pl-2'>Salir</span>
                </Link>
              )
            }
            {
              !authorization && (
                <>
                  <Link to='/sobreNosotros'>
                    <i className='text-secondary fas fa-users' />
                    <span className='pl-3'>Nosotros</span>
                  </Link>
                </>
              )
            }
            {
              authorization && (
                <>
                  <Link to='/perfil'>
                    <i className='text-secondary fas fa-user-edit' />
                    <span className='pl-2'>Perfil</span>
                  </Link>
                  <Link to='/dashboard'>
                    <i className='text-secondary fas fa-bullhorn' />
                    <span className='pl-3'>Dashboard</span>
                  </Link>
                </>
              )
            }
            <Link to='/publicar'>
              <i className='text-secondary fas fa-upload' />
              <span className='pl-3'>Publicar</span>
            </Link>
            {
              !authorization && (
                <>
                  <Link to='/registrarse'>
                    <i className='text-secondary fas fa-cash-register' />
                    <span className='pl-3'>Registro</span>
                  </Link>
                  <Link to='/iniciarSesion'>
                    <i className='text-secondary fas fa-sign-in-alt' />
                    <span className='pl-3'>Ingreso</span>
                  </Link>
                </>
              )
            }
            <Link to='/'>
              <i className='text-secondary fas fa-home' />
              <span className='pl-3'>Inicio</span>
            </Link>
          </div>
        </div>
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img onClick={closeMenu} src={LogoCompeto} alt='Donar' width={130} className='d-inline-block align-top pl-0' />
        </Link>
        <div className='menu_nav d-block d-sm-block d-md-none'>
          <div className='px-5'>
            <div className={`${authorization ? 'tw-py-5' : 'py-5'}`}>
              <div className={`row d-flex align-items-center${!authorization && 'pb-3'}`}>
                <div className='col-3'>
                  <img src={Avatar} width={55} alt='avatar' />
                </div>
                <div className='col-9'>
                  <h3>¡Bienvenido!</h3>
                  {
                    authorization ? (
                      <div>
                        <p>{authorization.nombre}</p>
                        <p>{authorization.apellido}</p>
                      </div>
                    ) : <small>Ingresa para donar o recibir donación.</small>
                  }
                </div>
              </div>
              {
                !authorization && (
                  <div className='row'>
                    <div className='col-6'>
                      <Link onClick={closeMenu} to='/iniciarSesion' className='btn bg-button btn-block'>Ingresar</Link>
                    </div>
                    <div className='col-6'>
                      <Link onClick={closeMenu} to='/registrarse' className='btn bg-button btn-block'>Registrarse</Link>
                    </div>
                  </div>
                )
              }
            </div>
            <hr />
            <div className='row'>
              <div className='col-12 py-12'>
                <Link onClick={closeMenu} to='/'>
                  <i className='text-secondary fas fa-home' />
                  <span className='pl-3'>Inicio</span>
                  {' '}
                </Link>
              </div>
              <div className='col-12 py-4'>
                <Link onClick={closeMenu} to='/publicar'>
                  <i className='text-secondary fas fa-upload' />
                  <span className='pl-3'>Publicar</span>
                  {' '}
                </Link>
              </div>
              <div className='col-12 mb-4'>
                <Link onClick={closeMenu} to='/misPublicaciones'>
                  <i className='text-secondary fas fa-bullhorn' />
                  <span className='pl-3'>Mis Publicaciones</span>
                </Link>
              </div>
              <div className='col-12 mb-4'>
                <Link onClick={closeMenu} to='/conversaciones'>
                  <i className='text-secondary fas fa-comment-dots' />
                  <span className='pl-3'>Conversaciones</span>
                </Link>
              </div>
              <div className='col-12 mb-4'>
                <Link onClick={closeMenu} to='/entregas'>
                  <i className='text-secondary fas fa-shipping-fast' />
                  <span className='pl-3'>Entregas</span>
                </Link>
              </div>
              <div className='col-12 mb-4'>
                <Link onClick={closeMenu} to='/perfil'>
                  <i className='text-secondary fas fa-user-edit' />
                  <span className='pl-3'>Perfil</span>
                </Link>
              </div>
              <div className='col-12'>
                {
                  authorization && (
                    <Link onClick={closeMenu} to='/salir'>
                      <i className='text-secondary fas fa-times-circle' />
                      <span className='pl-3'>Salir</span>
                    </Link>
                  )
                }
              </div>
              {/* <div className='col-12'>
                <Link onClick={closeMenu} to='/salir'>
                  <i className='text-secondary fas fa-users' />
                  <span className='pl-3'>Nosotros</span>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
