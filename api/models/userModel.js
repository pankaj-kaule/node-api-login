const mongoose = require('mongoose');

const user = mongoose.model('users', new mongoose.Schema({ 
    name: String,
    username: String,
    password: String
}));

module.exports = user;