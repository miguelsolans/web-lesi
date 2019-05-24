const mongoose = require('mongoose');

// Data Structure for Collection 'Education'
const educationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    school: { type: String, required: true  },
    course: { type: String, required: true  },
    link:   { type: String, required: false }
});

// Mongoose Model
const Education = mongoose.model('education', educationSchema, 'education');

//export model
module.exports = Education;