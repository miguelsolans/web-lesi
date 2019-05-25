const mongoose = require('mongoose');

// Data Structure for Collection 'Jobs'
const jobsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company:     { type: String,  required: true   },
    link:        { type: String,  required: false  },
    description: { type: String,  required: false  },
    flag:        { type: Boolean, required: false }
});

// Mongoose Model
const Jobs = mongoose.model('jobs', jobsSchema, 'jobs');

//export model
module.exports = Jobs;