export const responseJSON = (tipo, codigo, mensaje, cuerpo) => {
    return {
      tipo: tipo ? 'correcto' : 'fallo',
      resultado,
      mensaje,
      cuerpo
    }
}