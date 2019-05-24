const mongoose = require('mongoose');

// Data Structure for Collection 'Jobs'
const jobsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    company:     { type: String, required: true  },
    link:        { type: String, required: false },
    description: { type: String, required: false },
    flag:        {type: Boolean, required: false }
});

// Mongoose Model
const Jobs = mongoose.model('Jobs', jobsSchema);

//export model
module.exports = Jobs;