const mongoose = require('mongoose');

// Data Structure for Collection 'Education'
const tagSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: { type: Array }
});

// Mongoose Model
const Tags = mongoose.model('tags', tagSchema, 'tags');

//export model
module.exports = Tags;