const jwt = require('./jwt');
const config = require('../config/config'); // feels redundant
const models = require('../models');

module.exports = (redirectAuthenticated = true) => {
    return function (req, res, next) {
        const headerToken = req.headers.authorization.split(' ')[1]; // second item of headers
        // console.log(headerToken);
        const token = req.cookies[config.authCookieName] || headerToken || ''; // lmao or ''
        Promise.all([
            jwt.verifyToken(token),
            models.TokenBlacklist.findOne({ token })
        ])
        .then(([data, blacklistToken]) => {
            if (blacklistToken) { return Promise.reject(new Error('blacklisted token')) }
            models.User.findById(data.id)
            .then((user) => {
                req.user = user;
                next();
            });
        })
        .catch(err => {
            if (!redirectAuthenticated) { next(); return; }
            if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                res.status(401).send('No Way Jose!');
                return;
            }
            next(err);
        })
    }
};