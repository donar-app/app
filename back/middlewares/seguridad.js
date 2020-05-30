const jwt = require('jsonwebtoken');

const setTokenEnCabecera = (res, token) => {
  res.set({
    Authorization: `${token}`,
    'Accept-Charset': 'utf-8',
    'Access-Control-Expose-Headers': 'Authorization',
  });
};

const crearToken = async (objToken) => {
  const token = await jwt.sign(
    {
      iss: 'donar',
      id: objToken.id,
      alias: objToken.alias,
    },
    process.env.SECRETKEY,
    { expiresIn: '15min' },
  );

  return token;
};

const verificaToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ');

  if (!token || token.length < 2 || token[0] !== 'Bearer') {
    return res.status(401).json({ message: '401 Unauthorized' });
  }

  const decoded = await jwt.verify(authorization, process.env.SECRETKEY);

  if (!decoded) {
    return res.status(401).json({ message: '401 Unauthorized' });
  }

  const id = Object.prototype.hasOwnProperty.call(decoded, 'id');
  const alias = Object.prototype.hasOwnProperty.call(decoded, 'alias');

  if (!id || !alias) {
    return res.status(401).json({ message: '401 Unauthorized' });
  }

  req.body.jwt_usuario_id = decoded.id;
  req.body.jwt_usuario_alias = decoded.alias;

  const newToken = await crearToken({
    sub: 'update', aud: 'web', id: decoded.id, alias: decoded.alias,
  });

  await setTokenEnCabecera(res, newToken);
  next();
};

module.exports = {
  setTokenEnCabecera, crearToken, verificaToken,
};
