import { peticion } from '../functions';

const getAllPublicaciones = async () => {
    const { data } = await peticion('publicaciones', 'GET');

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