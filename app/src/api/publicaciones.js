import { peticion } from '../functions';

const getAllPublicaciones = async () => {
    const { data } = await peticion('publicaciones', 'GET');

    return data;
};
const obtenerMisPublicaciones = () => {};

export {
    getAllPublicaciones,
    obtenerMisPublicaciones
};