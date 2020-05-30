import React from 'react';
import '../assets/styles/NavBar.css'
import LogoCompeto from '../assets/static/logo-completo.png';
import LogoIcono from '../assets/static/icono-logo-d.png';
import LogoIconoCirculo from '../assets/static/icono-logo-circulo.png'

const NavBar = () => {
    return (
        <nav className="navbar shadow">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    {/* <img src={LogoIconoCirculo} width={40} className="d-inline-block align-top"/> */}
                    <img src={LogoCompeto} width={130} className="d-inline-block align-top pl-0" />
                </a>
                <button className="d-block d-sm-block d-md-none"><i className="fas fa-bars fa-lg"></i></button>
                <div className="d-none d-sm-none d-md-block">
                    <div className="links">
                        <a href="#">Categorias</a>
                        <a href="#">Donaciones</a>
                        <a href="#">Sobre Nosotros</a>
                        <a href="#">Login</a>
                        <a href="#">Registro</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;