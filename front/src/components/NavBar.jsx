import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';
import LogoCompeto from '../assets/static/logo-completo.png';
import Avatar from '../assets/static/user.png';

const NavBar = () => {

  function handleMenuOpen() {
    document.querySelector('.menu_nav').classList.toggle('menu_open');
  }

  return (
    <nav className='navbar shadow tw-sticky md:tw-static tw-top-0 tw-left-0 tw-z-10'>
      <div className='container'>
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img src={LogoCompeto} width={130} alt='Donar' className='d-inline-block align-top pl-0' />
        </Link>
        <button type='button' className='d-block d-sm-block d-md-none button-desplegable' onClick={handleMenuOpen}><i className='fas fa-bars fa-sm' /></button>
        <div className='d-none d-sm-none d-md-block'>
          <div className='links tw-flex tw-flex-row-reverse tw-space-x-4 tw-space-x-reverse'>
            <Link to='/'>Login</Link>
            <Link to='/'>Registro</Link>
            <Link to='/publicar'>Publicar</Link>
            <Link to='/publicaciones'>Donaciones</Link>
            <Link to='/'>Sobre Nosotros</Link>
          </div>
        </div>
        <div className='menu_nav shadow d-block d-sm-block d-md-none'>
          <div className='navegacion'>
            <div className='row py-1'>
              <div className='col-12 d-flex justify-content-center'>
                <img src={Avatar} width={72} alt='avatar' />
              </div>
              <div className='col-12 text-center'>
                <small>Ingresá para ayudar</small>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center'>
                <Link to='/' className='btn btn-secondary p-0 px-3 mr-1'>Login</Link>
                <Link to='/' className='btn btn-outline-secondary p-0 px-2'>Registro</Link>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center py-1 pt-2'>
                <Link to='/publicaciones'>Donaciones</Link>
              </div>
              <div className='col-12 d-flex justify-content-center py-1'>
                <Link to='/publicar'>Publicar</Link>
              </div>
              <div className='col-12 d-flex justify-content-center py-1'>
                <Link to='/'>Sobre Nosotros</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
