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
