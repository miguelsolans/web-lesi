const mongoose = require('mongoose');

// Data Structure for Collection 'Education'
const keywordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: { type: String, required: true }
});

// Mongoose Model
const Keywords = mongoose.model('keywords', keywordSchema, 'keywords');

//export model
module.exports = Keywords;