const jwt = require('jsonwebtoken');

module.exports = {
    userAuth: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if(!token){
            return res.status(404).send("token is missing");
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (error) {
            return res.status(401).send("invalid token");
        }
        return next();
    },

    adminAuth: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if(!token){
            return res.status(404).send("token is missing");
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (error) {
            return res.status(401).send("invalid token");
        }
        return next();
    }
}