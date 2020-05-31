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
            <Link to='/iniciarSesion'>Ingresa</Link>
            <Link to='/registrarse'>Registro</Link>
            <Link to='/publicar'>Publicar</Link>
            {/*<Link to='/donaciones'>Donaciones</Link>*/}
            <Link to='/sobreNosotros'>Sobre Nosotros</Link>
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
                      <Link onClick={closeMenu} to='/iniciarSesion' className='btn bg-button btn-block'>Ingresá</Link>
                    </div>
                    <div className='col-6'>
                      <Link onClick={closeMenu} to='/registrarse' className='btn bg-button btn-block'>Registrate</Link>
                    </div>
                  </div>
                )
              }
            </div>
            <hr />
            <div className='row'>
              <div className='col-12 py-4'>
                <Link onClick={closeMenu} to='/publicar'>
                  <i className='text-secondary fas fa-file-import' />
                  <span className='pl-3'>Publicar</span>
                  {' '}
                </Link>
              </div>
              {/*<div className='col-12 mb-4'>
                <Link onClick={closeMenu} to='/donaciones'>
                  <i className='text-secondary fas fa-shopping-basket' />
                  <span className='pl-3'>Editar Perfil</span>
                </Link>
            </div>*/}
              <div className='col-12'>
                <Link onClick={closeMenu} to='/'>
                  <i className='text-secondary fas fa-users' />
                  <span className='pl-3'>Salir</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
