import { peticion } from '../functions';
import AsyncStorage from '@react-native-community/async-storage';

const postPeticiones = async ({ publicacionId }) => {
    const authorization = await AsyncStorage.getItem('authorization');

    const { data } = await peticion('peticiones', 'POST', authorization, {
        publicacion_id: publicacionId,
        obj_peticion: {},
      });

    console.log(publicacionId, data)

    return  data;
};

export {
    postPeticiones
};