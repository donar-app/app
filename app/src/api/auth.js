import { peticion } from '../functions';
const Buffer = require('buffer').Buffer;
import AsyncStorage from '@react-native-community/async-storage';

const postIngreso = async ({email, password}) => {
    try {
        const auth = await Buffer.from(`${email}:${password}`).toString('base64');
        const basic = `Basic ${auth}`;

        const response = await peticion('ingreso', 'POST', basic);
        const { tipo } = response;
        
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';

          return {
              error: true,
              mensaje,
          };
        } 
        
        const {authorization} = response;

        return {
            error: false,
            authorization
        };
    } catch (error) {
        return {
            error: true,
            mensaje: 'Error al intentar ingresar'
        };
    }

};

const postRegistro = async (registro) => {
    try {
        const response = await peticion('registro', 'POST', null, registro);
        const { tipo } = response;
        
        if (tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';

          return {
              error: true,
              mensaje,
          };
        } 
        
        const { cuerpo, mensaje } = response;

        if( typeof cuerpo === 'undefined') {
            return {
                error: true,
                mensaje: 'Error al intentar registrarse'
            };
        } else {
            return {
                error: false,
                usuario: response.cuerpo,
                mensaje: response.mensaje,
            };
        }
    } catch (error) {
        return {
            error: true,
            mensaje: 'Error al intentar registrarse'
        };
    }

};

const checkLogin = async () => {
    try {
        const authorization = await AsyncStorage.getItem('authorization');

        const response = await peticion('usuarios', 'GET', authorization);

        if( response.tipo === 'error' ){
            return {
                error: true,
                mensaje: response.mensaje
            }
        } else {
            return {
                error: false,
                mensaje: 'Autorizado',
            }
        }
    } catch (error) {
        return {
            error: true,
            mensaje: 'Error al intentar ingresar'
        };
    }

};

export {
    postIngreso,
    checkLogin,
    postRegistro,
};