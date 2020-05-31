/**
 * 
 * @param {Boolean} tipo Resume si la accion es correcta o erronea
 * @param {String} codigo Es un codigo interno del error. Sirve para los Unit Test
 * @param {String} mensaje Un mensaje describiendo el error, para que lo utilicen en el front-end 
 * @param {Object} cuerpo Es la entidad/es o informacion que se solicita
 */
const responseJSON = (tipo, codigo, mensaje, cuerpo) => {
    return {
      tipo: tipo ? 'correcto' : 'error',
      codigo,
      mensaje,
      cuerpo
    }
}
module.exports = {
  responseJSON
};
