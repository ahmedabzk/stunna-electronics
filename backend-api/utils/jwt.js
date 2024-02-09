import JWT from 'jsonwebtoken';

import errorHandler from '../errors/error.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Invalid token"));

    JWT.verify(token, process.env.SECRET, (err, user) => {
        if (err) return next(403, "Forbidden");
        req.user = user;
        // console.log(user);
        next();
    });
}

export default verifyToken


