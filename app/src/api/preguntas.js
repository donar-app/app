import { peticion } from '../functions';
import AsyncStorage from '@react-native-community/async-storage';

const postPreguntas = async ({ publicacion, pregunta }) => {
    const authorization = await AsyncStorage.getItem('authorization');

    // console.log({ authorization, publicacion, pregunta });

    const response = await peticion('preguntas', 'POST', authorization, {
        publicacion,
        pregunta
    });

    // console.log({response});

    return response;
};

export {
    postPreguntas
};