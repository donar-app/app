import React from 'react';
import Abbul from '../assets/static/abbul.png';
import Ailu from '../assets/static/ailu.png';
import Maxi from '../assets/static/maxi.png';
import Emiliano from '../assets/static/emiliano.png';
import Ariel from '../assets/static/ariel.png';
import Santiago from '../assets/static/santiagoMena.png'
import LogoCompleto from '../assets/static/logo-completo.png'

const SobreNosotros = () =>{
    return (
        <div className="card">
            <div className="card-body">

                <div className="row my-3">
                    <div className="col-12 text-center">
                        <h1 className="tw-text-2xl">Sobre Nosotros</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-12 order-lg-2 order-2">
                        <div className="row text-center">
                            <div className="col-12">
                                <h3 className="tw-text-xl">Nuestro Equipo</h3>
                            </div>
                            <div className="col-12 my-4">
                                <h3 className="tw-text-md">FrontEnd</h3>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={Ariel} class="rounded-circle tw-wid" alt="Responsive image"  width={130}/>
                                </div>
                                <div className="col-12 tw-pt-3">
                                    <p>Ariel Villareal</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="col-12 d-flex justify-content-center">
                                        <img src={Emiliano} class="rounded-circle" alt="Responsive image" width={130}/>
                                    </div>
                                    <div className="col-12 tw-pt-3">
                                        <p>Emiliano Rago</p>
                                    </div>
                                </div>
                            <div className="col-lg-4 col-6">
                                <div className="col-12 d-flex justify-content-center">
                                        <img src={Ailu} class="rounded-circle" alt="Responsive image" width={130}/>
                                </div>
                                <div className="col-12 tw-pt-3">
                                    <p>Aliuska Rodriguez</p>
                                </div>
                            </div>
                        </div>

                        <div className="row my-4 text-center">
                            <div className="col-12 mb-4">
                                <h3 className="tw-text-md">BackEnd</h3>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={Abbul} class="rounded-circle" alt="Responsive image" width={130}/>
                                </div>
                                <div className="col-12 tw-pt-3">
                                    <p>Abbul Rodriguez</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={Maxi} class="rounded-circle" alt="Responsive image" width={130}/>
                                </div>
                                <div className="col-12 tw-pt-3">
                                    <p>Maximiliano Ceballos</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="col-12 d-flex justify-content-center">
                                    <img src={Santiago} class="rounded-circle" alt="Responsive image" width={130}/>
                                </div>
                                <div className="col-12 tw-pt-3">
                                    <p>Santiago Mena</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>  

                    <div className="col-lg-6 col-lg-12 order-lg-1 order-1 mb-4">
                        <div className="row">
                            <div className="col-12 mb-3 text-center">
                                <h3 className="tw-text-xl">Nuestra App</h3>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-lg-7 col-12 text-center">
                                Donar, es una plataforma sin fines de lucro, donde las personas podrán dar o recibir donaciones de algún producto que pueda ser reutilizado u alimentos perecederos. <br/>
                                Muchos de nosotros tenemos productos que ya no utilizamos, sea en nuestras casas o trabajos. Productos como ropa, sillas, colchones, vasos, y entre muchos mas. Sabemos que alguien le daría mejor uso que nosotros, alguien que quizás no se encuentra en su mejor momento económico para adquirir ese producto, por eso, se creo esta plataforma. 
                                Para ayudar a personas, sin ni siquiera nosotros vernos afectados, ya que ese producto que vas a donar no cambiara nada en tu vida, ya que casi no formaba parte de ella, y en cambio, servirá de mucho para quien la reciba.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
};

export default SobreNosotros;