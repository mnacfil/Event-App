const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is defined']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLenght: [6, 'password must be greater than 6']
    }
}, {timeStamp: true})

userSchema.pre('save', async function(){
    
    if(!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)
