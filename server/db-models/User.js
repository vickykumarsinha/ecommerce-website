const mongoose = require('mongoose');

// new Schema
const UserSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

// creating new User Model using 'UserSchema'
const User = new mongoose.model('user', UserSchema); 
module.exports = User;