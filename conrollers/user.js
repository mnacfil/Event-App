const User = require('../models/User');
const {attachCookieToResponse, createTokenUser} = require('../util')

const register = async (req, res) => {
    // Get the email from user
    const {email} = req.body;
    
    const emailAlreadyUsed = await User.findOne({email});
    // check if the email is already been used
    if(emailAlreadyUsed) {
        throw new Error('Email already used');
    }
    // otherwise, create 
    const user = await User.create(req.body);

    // create user with only name, email, userId
    const tokenUser = createTokenUser(user);
    // attach cookie
    attachCookieToResponse(res, tokenUser);
    res.status(201).json({ user})
}

const login = async (req, res) => {
    const {email, password} = req.body
    // if no email or password is provide
    if(!email || !password) {
        throw new Error('Please provide all values')
    }
    // search the user using email
    const user = await User.findOne({email})
    // if the user is not found in db
    if(!user) {
        throw new Error('Invalid credentials')
    }
    // otherwise, user is there
    const tokenUser = createTokenUser(user);
    // attache cookie 
    attachCookieToResponse(res, tokenUser);
    res.status(200).json({tokenUser});
}

const getAllUser = async (req, res) => {
    // find all users
    const users = await User.find({}).select('-password');
    res.status(200).json({ users, count: users.length })
}

const deleteUser = async (req, res) => {
    const users = await User.findOneAndRemove({_id: req.params.id});
    res.status(200).json({ msg: "Delete Succesfully"});
}

module.exports = {
    register,
    login,
    getAllUser,
    deleteUser
}