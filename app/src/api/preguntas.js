import { peticion } from '../functions';
import AsyncStorage from '@react-native-community/async-storage';

const postPreguntas = async ({ publicacionId, pregunta }) => {
    const authorization = await AsyncStorage.getItem('authorization');
    
    console.log( {
        publicacion_id: publicacionId,
        pregunta,
        authorization
    });

    const response = [];

    // const response = await peticion('preguntas', 'POST', authorization, {
    //     publicacion_id: publicacionId,
    //     pregunta
    // });

    // console.log(response);

    return  response;
};

export {
    postPreguntas
};