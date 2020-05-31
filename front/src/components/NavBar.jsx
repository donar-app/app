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
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={LogoCompeto} width={130} className="d-inline-block align-top pl-0"/>
                </a>
                <div className='menu_nav d-block d-sm-block d-md-none'>
                    <div className="px-5">
                        <div className="py-5">
                            <div className="row d-flex align-items-center pb-3">
                                <div className="col-3">
                                    <img src={Avatar} width={55} alt="avatar"/>
                                </div>
                                <div className="col-9">
                                    <h3>Bienvenido</h3>
                                    <small>Ingresa para donar o recibir donacion.</small>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <button className="btn btn-primary btn-block">Ingresa</button>
                                </div>
                                <div className="col-6">
                                <button className="btn btn-primary btn-block">Registrate</button>
                                </div>
                            </div>
                        </div>
                         
                        <hr/>

                        <div className="row">
                            <div className="col-12 py-4">
                                <a href=""><i class="text-secondary fas fa-file-import"></i><span className="pl-3">Publica</span>  </a>
                            </div>
                            <div className="col-12 mb-4"><i class="text-secondary fas fa-shopping-basket"></i><span className="pl-3">Donaciones</span></div>
                            <div className="col-12"><i class="text-secondary fas fa-users"></i><span className="pl-3">Sobre Nosotros</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;