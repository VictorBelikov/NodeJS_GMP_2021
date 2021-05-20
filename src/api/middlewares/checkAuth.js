import jwt from 'jsonwebtoken';

import errorService from '../../utils/errorService.js';

export default (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1]; // or
    const token = req.get('Authorization')?.split(' ')[1];
    if (!token) {
      throw errorService(401, 'Auth failed. JWT must be provided.');
    }

    jwt.verify(token, process.env.JWT_KEY, (err, _decodedToken) => {
      if (err) {
        throw errorService(403, `${err.name} - ${err.message}`);
      }
      next();
    });
  } catch (err) {
    return next(err);
  }
};
