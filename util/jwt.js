const jwt = require('jsonwebtoken');

// Create JWT token
const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

// Check if Token is Valid
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

// Attach cookie to response
const attachCookieToResponse = (res, user) => {
    const accessToken = createJWT({payload: user})
    // one day of expiration    
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookieToResponse
}