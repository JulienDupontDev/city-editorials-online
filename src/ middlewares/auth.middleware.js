import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Pas de token fourni' });
  }
  const token = req.headers.authorization
    .replace('Bearer', '')
    .split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.user = decoded;
    next();
  });
};
