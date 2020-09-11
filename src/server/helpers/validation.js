const jwt = require("jsonwebtoken");

const verify = function(req, res, next) {
    const token = req.header("auth-token");
    if (!token) res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified;
    }
    catch (error) {
        res.status(400).send("Invalid Token")
    }
};

module.exports = verify;