import { peticion } from '../functions';

const getAllPublicaciones = async () => {
    const response = await peticion('publicaciones', 'GET');

    if( response && response.tipo == 'error' ) {
        console.log({error: response});
        return [];
    }

    const { cuerpo: data } = response;

    return data;
};

const getAllDonaciones = async () => {
    const data = await getAllPublicaciones();

    return data.filter(publicacion => publicacion.tipo === 'Donación');
};

const getAllSolicitudes = async () => {
    const data = await getAllPublicaciones();

    return data.filter(publicacion => publicacion.tipo === 'Solicitud');
};

const obtenerMisPublicaciones = () => {};

export {
    getAllPublicaciones,
    getAllDonaciones,
    getAllSolicitudes,
    obtenerMisPublicaciones
};