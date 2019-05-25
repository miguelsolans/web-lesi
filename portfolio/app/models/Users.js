const mongoose = require('mongoose');

// Data Structure for Collection 'Users'
const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:    { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Mongoose Model
const Users = mongoose.model('users', usersSchema, 'users');

//export model
module.exports = Users;