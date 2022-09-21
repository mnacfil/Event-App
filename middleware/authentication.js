const { isTokenValid } = require("../util");


const authenticateUser = (req, res, next) => {
    const accessToken = req.signedCookies.accessToken;
    if(!accessToken) {
        throw new Error('Authentication Invalid')
    }

    try {
        const payload = isTokenValid(accessToken);
        req.user = payload;
        next()
    } catch (error) {
        throw new Error('Authentication Invalid')
    }
}

module.exports = {
    authenticateUser
}