const createTokenUser = (user) => {
    return {
        name: user.username,
        email: user.email,
        userId: user._id
    }
}

module.exports = createTokenUser;