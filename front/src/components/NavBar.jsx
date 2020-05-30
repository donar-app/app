import React from 'react';
import '../assets/styles/NavBar.css'
import LogoCompeto from '../assets/static/logo-completo.png';
import Avatar from '../assets/static/user.png';

const NavBar = () => {

    function handleMenuOpen() {
        document.querySelector('.menu_nav').classList.toggle('menu_open');
    }


    return (
        <nav className="navbar shadow">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={LogoCompeto} width={130} className="d-inline-block align-top pl-0" />
                    
                </a>
                <button type="button" className="d-block d-sm-block d-md-none button-desplegable" onClick={handleMenuOpen}><i className="fas fa-bars fa-sm"></i></button>
                <div className="d-none d-sm-none d-md-block">
                    <div className="links tw-flex tw-flex-row-reverse tw-space-x-4 tw-space-x-reverse">
                        <a href="#">Login</a>
                        <a href="#">Registro</a>
                        <a href="#">Publicar</a>
                        <a href="#">Donaciones</a>
                        <a href="#">Sobre Nosotros</a> 
                    </div>
                </div>
                <div className='menu_nav shadow d-block d-sm-block d-md-none'>
                    <div className="navegacion">
                        <div className="row py-1">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={Avatar} width={72} alt="avatar"/>
                                </div>
                                <div className="col-12 text-center">
                                    <small>Ingresá para ayudar</small>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <a href="#" className="btn btn-secondary p-0 px-3 mr-1">Login</a>
                                <a href="#" className="btn btn-outline-secondary p-0 px-2">Registro</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center py-1 pt-2">
                                <a href="#">Donaciones</a>
                            </div>
                            <div className="col-12 d-flex justify-content-center py-1">
                                <a href="#">Publicar</a>
                            </div>
                            <div className="col-12 d-flex justify-content-center py-1">
                                <a href="#">Sobre Nosotros</a> 
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </nav>
    );
}

export default NavBar;